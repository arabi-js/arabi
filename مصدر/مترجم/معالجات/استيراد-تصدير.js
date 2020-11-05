
import handler from '../مدخل';
import { type Handler } from '../../أنواع.js';

function importSpecifiersHandler(s) {
  let _default;
  let defaultSpecifier;
  if (s[0].type === 'ImportDefaultSpecifier') {
    defaultSpecifier = s.shift();
    _default = handler(defaultSpecifier.local, '');
  }

  let otherImports = s.length > 0 ? `{ ${
    s.map(s=> 
      s.imported.name !== s.local.name ? 
      `${s.imported.name} as ${s.local.name}` : 
      s.local.name).join(', ')
  } }` : null;

  return _default && otherImports ?
    `${_default}, ${otherImports}` :
    _default || otherImports
  ;
}

function exportSpecifiersHandler(s) {
  // we have ExportSpecifier only
  return `{ ${
    s.map(s=> 
      s.exported.name !== s.local.name ? 
      `${s.exported.name} as ${s.local.name}` : 
      s.local.name).join(', ')
  } }`;
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
  
    return node.specifiers ? 
      `import ${importSpecifiersHandler(node.specifiers)} from ${handler(node.source, '')}` + handler.semi :
      `import ${handler(node.source, '')}` + handler.semi
    ;
  },
};

export const exportHandler: Handler = {
  types: ['ExportNamedDeclaration', 'ExportDefaultDeclaration'],
  handle(node, indent = handler.indent) {
    if (node.type === 'ExportDefaultDeclaration')
      return `export default ${handler(node.declaration, '')}` + handler.semi;
    if (node.declaration) {
      let semi = handler.semi;
      handler.semi = '';
      return `export ${handler(node.declaration, '')}` + semi;
      handler.semi = semi;
    }
    return `export ${exportSpecifiersHandler(node.specifiers, '')}` + handler.semi;
  },
};

