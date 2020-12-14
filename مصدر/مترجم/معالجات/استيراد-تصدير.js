// @flow

import handler from '../مدخل';
import path from 'path';
import { getRandomName } from '../../مساعدات';
import { type Handler } from '../../أنواع.js';
import { stringify } from 'circular-json-es6';

function importSpecifiersHandler(s, map, mapOptions) {
  let isTranslated = typeof map !== 'undefined' && !handler.isModules;
  // { arName: string, alterName: string, map: TranslationMap, mapOptions: TranslationMapOptions }[];
  let imports = [];
  let _default, namespace;
  let defaultSpecifier, namespaceSpecifier;
  
  if (s[0].type === 'ImportDefaultSpecifier') {
    defaultSpecifier = s.shift();
    _default = handler(defaultSpecifier.local, '');
    if (isTranslated) {
      let __default = `__arjs__${getRandomName()}__`;
      imports.push({ name: _default, alterName: __default, map: mapOptions?.defaultMap || map, mapOptions });
      // now, we changes the name, the actual name will be a proxy of translation.
      // so the code hanceforth deals with a translated object.
      [ _default, __default ] = [ __default, _default ];
    }
    if (!s.length) return [_default, imports];
  }

  if (s[0].type === 'ImportNamespaceSpecifier') {
    namespaceSpecifier = s.shift();
    let namespaceLocal = handler(namespaceSpecifier.local, ''); // it is "Identifier"
    if (isTranslated) {
      let _namespaceLocal = `__arjs__${getRandomName()}__`;
      imports.push({ name: namespaceLocal, alterName: _namespaceLocal, map, mapOptions }); // set [ theActualValue, theRandomGeneratedName ];
      // now, we changes the name, the actual name will be a proxy of translation.
      // so the code hanceforth deals with a translated object
      [ namespaceLocal, _namespaceLocal ] = [ _namespaceLocal, namespaceLocal ];
    }
    namespace = `* as ${namespaceLocal}`;
    return [
      _default ? `${_default}, ${namespace}`: namespace,
      imports
    ];
  }

  let otherImports =
    s.map(s=>{
      let imported = s.imported.name;
      let local = s.local.name;
      
      if (isTranslated && imported in map) {
        let _map, _options;
        let arName = imported;
        imported = map[imported]; // we don't need the arabic one any more
        
        if (imported instanceof Array) {
          _map = imported[1];
          _options = imported[2];
          imported = imported[0];
        }

        if (_map) {
          let _local = `__arjs__${getRandomName()}__`;
          imports.push({ arName, importedName: imported, name: local, alterName: _local, map: _map, mapOptions: _options });
          [ _local, local ] = [ local, _local ];
        }
 
        return `${imported} as ${local}`;
      }

      return imported !== local ? 
        `${imported} as ${local}` : 
        local
      ;
    }).join(', ');

  otherImports = `{ ${otherImports} }`;
  return [_default ? `${_default}, ${otherImports}` : otherImports, imports];
}

export const importHandler: Handler = {
  types: ['ImportDeclaration'],
  handle(node, indent = handler.indent) {
    // interface ImportDeclaration <: ModuleDeclaration {
    //   type: "ImportDeclaration";
    //   importKind: null | "type" | "typeof" | "value";
    //   specifiers: [ ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier ];
    //   source: Literal;
    //   attributes?: [ ImportAttribute ];
    // }

    let source = node.source.value; // node.source is a "StringLiteral"
    let mdl = handler.maps.modules?.[source];
    let map = mdl?.[1];
    let mapOptions = mdl?.[2];
    if (map && handler.isModules) {
      handler.modulesToTranslate.push(source);
      source = path.relative(
        path.dirname(handler._filepath),
        path.resolve(handler.tmodulesDir, mdl[0] + '.arjs.js')
      );
      let s = source.slice(0, 2);
      source = s === '..' ? source : s === './' ? source : './' + source;
    } else if (map) source = mdl[0];

    source = `"${source}"`;

    if (node.specifiers) {
      let imports = importSpecifiersHandler(node.specifiers, map, mapOptions);
      let trailingCode = '';
      let importCode = `import ${imports[0]} from ${source}`;
      if (map && !handler.isModules && imports[1].length > 0) {
        // direct inline translation of the imported APIs
        trailingCode = imports[1].map(tt=>`const ${tt.name} = ${handler.tfnName}(${tt.alterName}, ${stringify(tt.map)}, ${stringify(tt.mapOptions)})`).join('; ');
      }
      return importCode + (trailingCode ? '; ' + trailingCode : '') + handler.eol;
    } else {
      let importCode = `import ${source}`;
      return indent + importCode + handler.eol;
    }

  },
};

function exportSpecifiersHandler(s) {
  // we have ExportSpecifier only
  let specifiers = s.map(
    s => s.exported.name !== s.local.name
    ? `${s.local.name} as ${s.exported.name}`
    :  s.local.name
  ).join(', ');
  return `{ ${specifiers} }`;
}

export const exportHandler: Handler = {
  types: ['ExportNamedDeclaration', 'ExportDefaultDeclaration', 'ExportAllDeclaration'],
  handle(node, indent = handler.indent) {
    let code;
    if (node.type === 'ExportDefaultDeclaration') {
      let semi = handler.eol;
      handler.eol = '';
      code = `export default ${handler(node.declaration, '')}` + semi;
      handler.eol = semi;
      return code;
    } else if (node.type === 'ExportAllDeclaration') {
      return `export * from ${handler(node.source, '')}`;
    } else if (node.declaration) {
      let semi = handler.eol;
      handler.eol = '';
      code = `export ${handler(node.declaration, '')}` + semi;
      handler.eol = semi;
      return code;
    }

    let source = node.source ? ' from ' + handler(node.source) : '';
    return indent + `export ${exportSpecifiersHandler(node.specifiers, '')}` + source + handler.eol;
  },
};
