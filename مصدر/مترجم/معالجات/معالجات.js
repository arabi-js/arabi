// @flow

import handler from '../مدخل';
import * as keywordsMap from '../../babel-parser/src/keywords-map';
import { type Handler } from '../../أنواع.js';

// المعالجات
export { importHandler, exportHandler } from './استيراد-تصدير';
export { blockHandler } from './قطاع';
export { ifHandler } from './جملة-لو';
export { forHandler } from './حلقة-لكل';
export { whileHandler } from './حلقة-بينما';
export { switchHandler } from './جملة-البدائل';
export { literalHandler } from './جملة-حرفية';
export { objectHandler } from './كائن';
export { arrayHandler } from './مصفوفة';
export { classHandler } from './فئة';
export { functionHandler } from './دالة';
export { callHandler } from './تعبير-الاستدعاء';
export { declarationHandler } from './تعريف-متغير';
export { assignmentHandler } from './تعيين';

export const expressionHandler: Handler = {
  types: ['ExpressionStatement'],
  handle(node, indent = handler.indent) {
    return indent + handler(node.expression, '') + handler.eol;
  },
};

export const seqExprHandler: Handler = {
  types: ['SequenceExpression'],
  handle(node, indent = handler.indent) {
    return indent + node.expressions.map(e=>handler(e, '')).join(', ');
  },
};

export const identifierHandler: Handler = {
  types: ['Identifier'],
  handle(node, indent = '') {
    // TODO: make sure that the ids maping is happening only with referenced ids
    // `Foo.arguments`, arguments has to still the same.
    if(!handler.scope.has(node.name)) {
      if (node.name === keywordsMap._arguments && handler.functionDepth)
        return indent + 'arguments';
      if (node.name === keywordsMap._eval)
        return 'eval';
    }
    return indent + node.name;
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
    let a, k = ['typeof', 'void', 'delete', 'throw'];
    // e.g., a = _throw when o === keywordsMap._throw
    o = ((a = k.find(_=>o===keywordsMap[`_${_}`])) && (a + ' ')) || o;
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
    let semi = node.type.slice(-"Statement".length) === "Statement" ? handler.eol : '';
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
      indent + keyword + label + handler.eol
    );
  },
};

export const labeledHandler: Handler = {
  types: ['LabeledStatement'],
  handler(node, indent = handler.indent) {
    let label = handler(node.label, '') + ': ';
    let body = handler(node.body, '');
    return indent + label + body + handler.eol;
  },
};

export const dotsHandler: Handler = {
  types: ['RestElement', 'SpreadElement'],
  handler(node, indent = handler.indent) {
    let arg = handler(node.label, '');
    return indent + "..." + arg;
  },
};

export const specialLiteralsHandler: Handler = {
  types: ['Import', 'Super', 'ThisExpression'],
  handle(node, indent = handler.indent) {
    return indent + (node.type === 'ThisExpression' ? 'this' : node.type.toLowerCase());
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

export const othersHandler: Handler = {
  types: ['EmptyStatement', 'DebuggerStatement', 'PrivateName'],
  handle(node, indent=handler.indent) {
    if (node.type === 'DebuggerStatement') return indent + 'debugger' + handler.eol;
    if (node.type === 'PrivateName') return '#' + handler(node.id, '');
    if (node.type === 'EmptyStatement') return indent + ';';
    // if (node.type === '') 
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
