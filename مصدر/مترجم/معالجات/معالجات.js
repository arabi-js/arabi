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
export { switchHandler } from './بدائل';
export { memExpressionHandler } from './تعبير-العضو';
export { identifierHandler } from './معرف';
export { importHandler, exportHandler } from './استيراد-تصدير';

export const expressionHandler: Handler = {
  types: ['ExpressionStatement'],
  handle(node, indent = handler.indent) {
    return indent + handler(node.expression, '') + handler.semi;
  },
};

export const callHandler: Handler = {
  types: ['CallExpression'],
  handle(node, indent=handler.indent) {
    return (
      indent +
      `${handler(node.callee, '')}(${node.arguments
        .map((n) => handler(n, ''))
        .join(', ')})`
    );
  },
};

export const binaryExpressionHandler: Handler = {
  types: ['BinaryExpression'],
  handle(node, indent=handler.indent) {
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
  types: ['ReturnStatement'],
  handle(node, indent = handler.indent) {
    return (
      indent +
      'return' +
      (node.argument ? ' ' + handler(node.argument, '') : '') +
      handler.semi
    );
  },
};

export const blockStatment: Handler = {
  types: ['BreakStatement'],
  handle(node, indent = handler.indent) {
    return (
      indent +
      'break' +
      (node.label ? ' ' + handler(node.label, '') : '') +
      handler.semi
    );
  },
};

export const debuggerStatment: Handler = {
  types: ['DebuggerStatement'],
  handle(node, indent = handler.indent) {
    return (
      indent + 'break' + handler.semi
    );
  },
};

export const labeledHandler: Handler = {
  types: ['LabeledStatement'],
  handler(node, indent = handler.indent) {
    let label = handler(node.label, '') + ': ';
    let body = handler(node.body, '');
    return indent + label + body;
  },
};

export const labeledHandler: Handler = {
  types: ['RestElement', 'SpreadElement'],
  handler(node, indent = handler.indent) {
    let arg = handler(node.label, '');
    return indent + "..." + arg;
  },
};

// ----------------
/*
// Identifier
PrivateName
// Literals
// RegExpLiteral
// NullLiteral
// StringLiteral
// BooleanLiteral
// NumericLiteral
// BigIntLiteral
// DecimalLiteral
// Programs
// Functions
// Statements
ExpressionStatement
BlockStatement
EmptyStatement
// DebuggerStatement
WithStatement
// ReturnStatement
// LabeledStatement
// BreakStatement
ContinueStatement
Choice
// IfStatement
SwitchStatement
SwitchCase
Exceptions
ThrowStatement
TryStatement
CatchClause
// Loops
// WhileStatement
// DoWhileStatement
// ForStatement
// ForInStatement
// ForOfStatement
// Declarations
// FunctionDeclaration
// VariableDeclaration
// VariableDeclarator
Misc
Decorator
Directive
DirectiveLiteral
InterpreterDirective
Expressions
Super
Import
ThisExpression
ArrowFunctionExpression
YieldExpression
AwaitExpression
ArrayExpression
ObjectExpression
ObjectMember
ObjectProperty
ObjectMethod
RecordExpression
TupleExpression
FunctionExpression
UnaryExpression
UnaryOperator
UpdateExpression
UpdateOperator
BinaryExpression
BinaryOperator
AssignmentExpression
AssignmentOperator
LogicalExpression
LogicalOperator
// SpreadElement
ArgumentPlaceholder
MemberExpression
OptionalMemberExpression
BindExpression
ConditionalExpression
CallExpression
OptionalCallExpression
NewExpression
SequenceExpression
ParenthesizedExpression
DoExpression
TemplateLiteral
TaggedTemplateExpression
TemplateElement
// Patterns
// ObjectPattern
// ArrayPattern
// RestElement
// AssignmentPattern
Classes
ClassBody
ClassMethod
ClassPrivateMethod
ClassProperty
ClassPrivateProperty
ClassDeclaration
ClassExpression
MetaProperty
Modules
ModuleDeclaration
ModuleSpecifier
// Imports
// ImportDeclaration
// ImportSpecifier
// ImportDefaultSpecifier
// ImportNamespaceSpecifier
// ImportAttribute
// Exports
// ExportNamedDeclaration
// ExportSpecifier
// ExportDefaultDeclaration
// ExportAllDeclaration
*/
