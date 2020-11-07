
import handler from '../مدخل';
import { test, resolve, getRandomName } from './مساعدات';
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
      [ _default, __default ] = [ __default, _default ]; // switch the values;
      imports.push([ __default, _default, map ]); // set [ theActualValue, theRandomGeneratedName ];
    }
    if (!s.length) return [_default, imports];
  }

  if (s[0].type === 'ImportNamespaceSpecifier') {
    namespaceSpecifier = s.shift();
    let namspaceLocal = handler(namespaceSpecifier.local, '');
    if (isTranslated) {
      let _namespaceLocal = `__arjs__${getRandomName()}__`;
      [ namspaceLocal, _namespaceLocal ] = [ _namespaceLocal, namspaceLocal ]; // switch the values;
      imports([ _namespaceLocal, namspaceLocal, map ]); // set [ theActualValue, theRandomGeneratedName ];
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
          [ _local, local ] = [ local, _local ];
          imports.push([ _local, local, _map ]);
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

    let source = node.source.value;
    let mdl = handler.maps.modules?.find(m=>test(m.test, source));
    let map = mdl?.map;
    source = mdl && mdl.resolve ? resolve(mdl.resolve, source) : source;
    source = `"${source}"`;

    if (node.specifiers) {
      let imports = importSpecifiersHandler(node.specifiers, map);
      let trailingCode = '';
      let importCode = '';
      if (map) {
        // we will use imports[1]
        let alternateName = `__arjs__${getRandomName()}__`;
        importCode = `import ${alternateName} from ${source}` + handler.semi;
        imports = imports[1];
        handler.addTranslator = true;
        trailingCode = imports.map(tt=>`const ${tt[0]} = __arjs__translate__(${tt[1]}, ${JSON.stringify(tt[2])})`).join('; ');
      } else {
        importCode = `import ${imports[0]} from ${source}`;
      }
      return importCode + (trailingCode ? ' ' + trailingCode : '') + handler.semi;
    } else {
      let importCode = `import ${source}` + handler.semi;
      let trailingCode = ``;
      return importCode + " " + trailingCode + handler.semi;
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
  types: ['ExportNamedDeclaration', 'ExportDefaultDeclaration'],
  handle(node, indent = handler.indent) {
    let code;
    if (node.type === 'ExportDefaultDeclaration') {
      let semi = handler.semi;
      handler.semi = '';
      code = `export default ${handler(node.declaration, '')}` + semi;
      handler.semi = semi;
      return code;
    }
    if (node.declaration) {
      let semi = handler.semi;
      handler.semi = '';
      code = `export ${handler(node.declaration, '')}` + semi;
      handler.semi = semi;
      return code;
    }
    return `export ${exportSpecifiersHandler(node.specifiers, '')}` + handler.semi;
  },
};

