
import handler from '../مدخل';
import path from 'path';
import { test, resolve, getRandomName } from '../../مساعدات';
import { type Handler } from '../../أنواع.js';

function importSpecifiersHandler(s, map) {
  let isTranslated = typeof map !== 'undefined';
  let imports = [] ; // { default:, namespace:, others: };
  let _default, namespace;
  let defaultSpecifier, namespaceSpecifier;
  if (s[0].type === 'ImportDefaultSpecifier') {
    defaultSpecifier = s.shift();
    _default = handler(defaultSpecifier.local, '');
    if (isTranslated) {
      let __default = `__arjs__${getRandomName()}__`;
      imports.push([ _default, __default, map ]); // set [ theActualValue, theRandomGeneratedName ];
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
      imports.push([ namespaceLocal, _namespaceLocal, map ]); // set [ theActualValue, theRandomGeneratedName ];
      // now, we changes the name, the actual name will be a proxy of translation.
      // so the code hanceforth deals with a translated object
      [ namespaceLocal, _namespaceLocal ] = [ _namespaceLocal, namespaceLocal ];
    }
    namespace = `* as ${namspaceLocal}`;
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
        let _map;
        imported = map[imported];
        
        if (imported instanceof Array) {
          _map = imported[1];
          imported = imported[0];
        }

        if (_map) {
          let _local = `__arjs__${getRandomName()}__`;
          imports.push([ local, _local, _map ]);
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
    if (map && handler.isModules) {
      handler.modulesToTranslate.push(source);
      source = path.relative(
        path.dirname(handler.filepath),
        path.resolve(handler.tmodulesDir, source + '.arjs')
      );
    } else if (map) source = mdl[0];

    source = `"${source}"`;

    if (node.specifiers) {
      let imports = importSpecifiersHandler(node.specifiers, map);
      let trailingCode = '';
      let importCode = `import ${imports[0]} from ${source}`;
      if (map) {
        // we will use imports[1]
        handler.addTranslator = true;
        trailingCode = imports[1].map(tt=>`const ${tt[0]} = __arjs__translate__(${tt[1]}, ${JSON.stringify(tt[2])})`).join('; ');
      }
      return importCode + (trailingCode ? '; ' + trailingCode : '') + handler.semi;
    } else {
      let importCode = `import ${source}` + handler.semi;
      let trailingCode = ``;
      return indent + importCode + " " + trailingCode + handler.semi;
    }

  },
};

function exportSpecifiersHandler(s) {
  // we have ExportSpecifier only
  return `{ ${
    s.map(s=> 
      s.exported.name !== s.local.name ? 
      `${s.local.name} as ${s.exported.name}` : 
      s.local.name).join(', ')
  } }`;
}

export const exportHandler: Handler = {
  types: ['ExportNamedDeclaration', 'ExportDefaultDeclaration', 'ExportAllDeclaration'],
  handle(node, indent = handler.indent) {
    let code;
    if (node.type === 'ExportDefaultDeclaration') {
      let semi = handler.semi;
      handler.semi = '';
      code = `export default ${handler(node.declaration, '')}` + semi;
      handler.semi = semi;
      return code;
    } else if (node.type === 'ExportAllDeclaration') {
      return `export * from ${handler(node.source, '')}`;
    } else if (node.declaration) {
      let semi = handler.semi;
      handler.semi = '';
      code = `export ${handler(node.declaration, '')}` + semi;
      handler.semi = semi;
      return code;
    }

    let source = node.source ? ' from ' + handler(node.source) : '';
    return indent + `export ${exportSpecifiersHandler(node.specifiers, '')}` + source + handler.semi;
  },
};

