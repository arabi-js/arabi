// @flow

import translate from '../مدخل';
import manager from '../مدير-الترجمة';
import { keywordsMap } from '@arabi/maps';
import { type Translator } from '../../أنواع.js';

// المعالجات
export { importTranslator, exportTranslator } from './استيراد-تصدير';
export { blockTranslator } from './قطاع';
export { tryTranslator } from './جملة-حاول';
export { ifTranslator } from './جملة-لو';
export { forTranslator } from './حلقة-لكل';
export { whileTranslator } from './حلقة-بينما';
export { switchTranslator } from './جملة-البدائل';
export { literalTranslator } from './جملة-حرفية';
export { objectTranslator } from './كائن';
export { arrayTranslator } from './مصفوفة';
export { classTranslator } from './فئة';
export { functionTranslator } from './دالة';
export { callTranslator } from './تعبير-الاستدعاء';
export { declarationTranslator } from './تعريف-متغير';
export { assignmentTranslator } from './تعيين';

// expression in a single line, it is a stand alone statement.
// e.g., when you use `&&` expression instead of IfStatement
export const expressionTranslator: Translator = {
  types: ['ExpressionStatement'],
  translate(node, indent = manager.indent) {
    return indent + translate(node.expression, '') + manager.eol;
  },
};

// tuples... e.g., `(0, doSomeThing(), callme())`
export const seqExprTranslator: Translator = {
  types: ['SequenceExpression'],
  translate(node, indent = manager.indent) {
    return indent + node.expressions.map((e) => translate(e, '')).join(', ');
  },
};

// do { ... }
export const doExprTranslator: Translator = {
  types: ['DoExpression'],
  translate(node, indent = manager.indent) {
    return indent + `do ${translate(node.body, '')}`;
  },
};

// while (object) { ... }
export const withStatement: Translator = {
  types: ['WithStatement'],
  translate(node, indent = manager.indent) {
    return indent + `with (${translate(node.object, '')}) ${translate(node.body, '')}`;
  },
};

export const identifierTranslator: Translator = {
  types: ['Identifier'],
  translate(node, indent = '') {
    // TODO: make sure that the ids maping is happening only with referenced ids
    // `Foo.arguments`, arguments has to still the same.
    if (!manager.scope.has(node.name)) {
      if (node.name === keywordsMap._arguments && manager.functionDepth)
        return indent + 'arguments';
      if (node.name === keywordsMap._eval) return 'eval';
    }
    return indent + node.name;
  },
};

// e.g., `1 + 2`
export const binaryExpressionTranslator: Translator = {
  types: ['BinaryExpression', 'LogicalExpression'],
  translate(node, indent = manager.indent) {
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
    return indent + `${translate(node.left, '')} ${node.operator} ${translate(node.right, '')}`;
  },
};

export const updateExprTranslator: Translator = {
  types: ['UpdateExpression'],
  translate(node, indent = manager.indent) {
    return indent + node.prefix
      ? node.operator + translate(node.argument, '')
      : translate(node.argument, '') + node.operator;
  },
};

// e.g., `throw "An error"`
export const unaryExprTranslator: Translator = {
  types: ['UnaryExpression'],
  translate(node, indent = manager.indent) {
    let o = node.operator;
    // "-" | "+" | "!" | "~" | "typeof" | "void" | "delete" | "throw"
    let a,
      k = ['typeof', 'void', 'delete', 'throw'];
    // e.g., a = _throw when o === keywordsMap._throw
    o = ((a = k.find((_) => o === keywordsMap[`_${_}`])) && a + ' ') || o;
    return indent + o + translate(node.argument, '');
  },
};

export const parenthesizedExpression: Translator = {
  types: ['ParenthesizedExpression'],
  translate(node, indent = manager.indent) {
    return indent + `(${translate(node.expression, '')})`;
  },
};

export const returnStatment: Translator = {
  types: ['ReturnStatement', 'ThrowStatement', 'AwaitExpression', 'YieldExpression'],
  translate(node, indent = manager.indent) {
    let keyword =
      node.type === 'ReturnStatement'
        ? 'return'
        : node.type === 'ThrowStatement'
        ? 'throw'
        : node.type === 'AwaitExpression'
        ? 'await'
        : 'yeild';
    let arg = node.argument ? ' ' + translate(node.argument, '') : '';
    let semi = node.type.slice(-'Statement'.length) === 'Statement' ? manager.eol : '';
    return indent + keyword + ' ' + arg + semi;
  },
};

export const blockStatment: Translator = {
  types: ['BreakStatement', 'ContinueStatement'],
  translate(node, indent = manager.indent) {
    let keyword = node.type === 'BreakStatement' ? 'break' : 'continue';
    let label = node.label ? ' ' + translate(node.label, '') : '';
    return indent + keyword + label + manager.eol;
  },
};

export const labeledTranslator: Translator = {
  types: ['LabeledStatement'],
  translate(node, indent = manager.indent) {
    let label = translate(node.label, '') + ': ';
    let body = translate(node.body, '');
    return indent + label + body + manager.eol;
  },
};

export const dotsTranslator: Translator = {
  types: ['RestElement', 'SpreadElement'],
  translate(node, indent = manager.indent) {
    let arg = translate(node.label, '');
    return indent + '...' + arg;
  },
};

export const specialLiteralsTranslator: Translator = {
  types: ['Import', 'Super', 'ThisExpression'],
  translate(node, indent = manager.indent) {
    return indent + (node.type === 'ThisExpression' ? 'this' : node.type.toLowerCase());
  },
};

export const memExpressionTranslator: Translator = {
  types: ['MemberExpression', 'OptionalMemberExpression'],
  translate(node, indent = '') {
    let optional = node.optional ? (node.computed ? '?.' : '?') : '';
    if (node.computed) {
      return indent + `${translate(node.object, '')}${optional}[${translate(node.property, '')}]`;
    }
    return indent + `${translate(node.object, '')}${optional}.${translate(node.property, '')}`;
  },
};

export const othersTranslator: Translator = {
  types: ['EmptyStatement', 'DebuggerStatement', 'PrivateName'],
  translate(node, indent = manager.indent) {
    if (node.type === 'DebuggerStatement') return indent + 'debugger' + manager.eol;
    if (node.type === 'PrivateName') return '#' + translate(node.id, '');
    if (node.type === 'EmptyStatement') return indent + ';';
    // if (node.type === '')
  },
};

export const metaPropTranslator: Translator = {
  types: ['MetaProperty'],
  translate(node, indent = manager.indent) {
    // both `meta` and `property` are of type "Identifier"
    return indent + `${node.meta.name}.${node.property.name}`;
  },
};

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
