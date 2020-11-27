import handler from '../مدخل';
import * as KeyMap from '../../../babel-parser/src/keywords-map';
import { type Handler } from '../../أنواع.js';

// المعالجات
export { ifHandler } from './جملة-لو';
export { blockHandler } from './قطاع';
export { literalHandler } from './جملة-حرفية';
export { functionHandler } from './دالة';
export { declarationHandler } from './تعريف-متغير';
export { objectHandler } from './كائن';
export { arrayHandler } from './مصفوفة';
export { assignmentHandler } from './تعيين';
export { forHandler } from './حلقة-لكل';
export { whileHandler } from './حلقة-بينما';
export { switchHandler } from './جملة-البدائل';
export { identifierHandler } from './معرف';
export { importHandler, exportHandler } from './استيراد-تصدير';

export const expressionHandler: Handler = {
  types: ['ExpressionStatement'],
  handle(node, indent = handler.indent) {
    return indent + handler(node.expression, '') + handler.semi;
  },
};

export const expressionHandler: Handler = {
  types: ['SequenceExpression'],
  handle(node, indent = handler.indent) {
    return indent + node.expressions.map(e=>handler(e, '')).join(', ');
  },
};

export const callHandler: Handler = {
  types: ['CallExpression', 'OptionalCallExpression', 'NewExpression'],
  handle(node, indent=handler.indent) {
    let prefix = node.type === 'NewExpression' ? 'new ' : '';
    let optional = node.optional ? '?.' : '';
    return (
      indent + prefix +
      `${handler(node.callee, '')}${optional}(${node.arguments
        .map((n) => handler(n, ''))
        .join(', ')})`
    );
  },
};

export const binaryExpressionHandler: Handler = {
  types: ['BinaryExpression', 'LogicalExpression'],
  handle(node, indent=handler.indent) {
    // enum LogicalOperator {
    //   "||" | "&&" | "??"
    // }
    // 
    // enum BinaryOperator {
    //   "==" | "!=" | "===" | "!=="
    //     | "<" | "<=" | ">" | ">="
    //     | "<<" | ">>" | ">>>"
    //     | "+" | "-" | "*" | "/" | "%"
    //     | "**" | "|" | "^" | "&" | "in"
    //     | "instanceof"
    //     | "|>"
    // }
    // 
    return (
      indent + `${handler(node.left, '')} ${node.operator} ${handler(node.right, '')}`
    );
  },
};

export const updateExprHandler: Handler = {
  types: ['UpdateExpression'],
  handle(node, indent=handler.indent) {
    return indent + node.prefix
      ? node.operator + handler(node.argument, '')
      : handler(node.argument, '') + node.operator;
  },
};

export const unaryExprHandler: Handler = {
  types: ['UnaryExpression'],
  handle(node, indent=handler.indent) {
    let o = node.operator;
    // "-" | "+" | "!" | "~" | "typeof" | "void" | "delete" | "throw"
    switch (o) {
      case KeyMap._typeof:
        o = "typeof "
        break;
      case KeyMap._void:
        o = "void "
        break;
      case KeyMap._delete:
        o = "delete "
        break;
      case KeyMap._throw:
        o = "throw "
        break;
    }
    return indent + o + handler(node.argument, '');
  },
};

export const parenthesizedExpression: Handler = {
  types: ['ParenthesizedExpression'],
  handle(node, indent=handler.indent) {
    return indent + `(${handler(node.expression, '')})`;
  },
};

export const returnStatment: Handler = {
  types: ['ReturnStatement', 'ThrowStatement', 'AwaitExpression', 'YieldExpression'],
  handle(node, indent = handler.indent) {
    let keyword =
      node.type === 'ReturnStatement' ?
      'return' : node.type === 'ThrowStatement' ?
      'throw' :  node.type === 'AwaitExpression' ? 
      'await' : 'yeild'
    ;
    let arg = (node.argument ? ' ' + handler(node.argument, '') : '');
    let semi = node.type.slice(-"Statement".length) === "Statement" ? handler.semi : '';
    return (
      indent + keyword + ' ' + arg + semi
    );
  },
};

export const blockStatment: Handler = {
  types: ['BreakStatement', 'ContinueStatement'],
  handle(node, indent = handler.indent) {
    let keyword = node.type === 'BreakStatement' ? 'break' : 'continue';
    let label = (node.label ? ' ' + handler(node.label, '') : '');
    return (
      indent + keyword + label + handler.semi
    );
  },
};

export const debuggerStatment: Handler = {
  types: ['DebuggerStatement'],
  handle(node, indent = handler.indent) {
    return (
      indent + 'debugger' + handler.semi
    );
  },
};

export const labeledHandler: Handler = {
  types: ['LabeledStatement'],
  handler(node, indent = handler.indent) {
    let label = handler(node.label, '') + ': ';
    let body = handler(node.body, '');
    return indent + label + body + handler.semi;
  },
};

export const dotsHandler: Handler = {
  types: ['RestElement', 'SpreadElement'],
  handler(node, indent = handler.indent) {
    let arg = handler(node.label, '');
    return indent + "..." + arg;
  },
};

export const dotsHandler: Handler = {
  types: ['Import', 'Super', 'ThisExpression'],
  handler(node, indent = handler.indent) {
    return node.type === 'ThisExpression' ? 'this' : node.type.toLowerCase();
  },
};

export const memExpressionHandler: Handler = {
  types: ['MemberExpression', 'OptionalMemberExpression'],
  handle(node, indent = '') {
    let optional = node.optional ? node.computed ? '?.' : '?' : '';
    if (node.computed) {
      return indent + `${handler(node.object, '')}${optional}[${handler(node.property, '')}]`;
    }
    return indent + `${handler(node.object, '')}${optional}.${handler(node.property, '')}`;
  },
};

export const privateNameHandler: Handler = {
  types: ['PrivateName'],
  handle(node, indent=handler.indent) {
    return '#' + handler(node.id, '');
  }
};

export const emptyHandler: Handler = {
  types: ['EmptyStatement'],
  handle(node, indent=handler.indent) {
    return ';';
  }
}

// ----------------
/*
// ArrayExpression
// ArrayPattern
// ArrowFunctionExpression
// AssignmentExpression
// AssignmentOperator
// AssignmentPattern
// AwaitExpression
// BigIntLiteral
// BinaryExpression
// BinaryOperator
// BlockStatement
// BooleanLiteral
// BreakStatement
// CallExpression
// ClassBody
// ClassDeclaration
// ClassExpression
// ClassMethod
// ClassPrivateMethod
// ClassPrivateProperty
// ClassProperty
// ConditionalExpression
// ContinueStatement
// DebuggerStatement
// DecimalLiteral
// Declarations
// DoWhileStatement
// ExportAllDeclaration
// ExportDefaultDeclaration
// ExportNamedDeclaration
// ExportSpecifier
// ExpressionStatement
// Expressions
// ForInStatement
// ForOfStatement
// ForStatement
// FunctionDeclaration
// FunctionExpression
// Functions
// Identifier
// IfStatement
// Import
// ImportAttribute
// ImportDeclaration
// ImportDefaultSpecifier
// ImportNamespaceSpecifier
// ImportSpecifier
// Imports
// LabeledStatement
// Literals
// NewExpression
// NullLiteral
// NumericLiteral
// ObjectExpression
// ObjectMember
// ObjectMethod
// ObjectPattern
// ObjectProperty
// ParenthesizedExpression
// Patterns
// PrivateName
// Programs
// RegExpLiteral
// RestElement
// ReturnStatement
// SequenceExpression
// SpreadElement
// Statements
// StringLiteral
// Super
// ThisExpression
// UnaryExpression
// UnaryOperator
// UpdateExpression
// UpdateOperator
// VariableDeclaration
// VariableDeclarator
// WhileStatement
// LogicalExpression
// LogicalOperator
// MemberExpression
// OptionalCallExpression
// OptionalMemberExpression
// SwitchCase
// SwitchStatement
// ThrowStatement
// YieldExpression
// CatchClause
// EmptyStatement
// InterpreterDirective
// MetaProperty
// RecordExpression
// TryStatement
// TupleExpression
// WithStatement
// BindExpression
// DoExpression
// Decorator
// TemplateElement
// TemplateLiteral
// TaggedTemplateExpression
ArgumentPlaceholder
Directive
DirectiveLiteral
*/
