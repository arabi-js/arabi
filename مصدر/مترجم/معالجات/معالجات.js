import handler from "../مدخل";
import { type Handler } from "../../أنواع.js";

// المعالجات
export { ifHandler } from "./جملة-لو";
export { blockHandler } from "./قطاع";
export { literalHandler } from "./جملة-حرفية";
export { functionHandler } from "./دالة";
export { declarationHandler } from "./تعريف-متغير";
export { objectHandler } from "./نمط-الكائن";
export { arrayHandler } from "./مصفوفة";

export const sequenceHandler: Handler = {
  test(node) {
    return node instanceof Array;
  },
  handle(node, indent = handler.indent) {
    return node.map((a) => handler(a)).join("\n\n");
  },
};

export const expressionHandler: Handler = {
  test(node) {
    return node.type === "ExpressionStatement";
  },
  handle(node, indent = handler.indent) {
    return indent + handler(node.expression) + handler.semi;
  },
};

export const memExprHandler: Handler = {
  test(node) {
    return node.type === "MemberExpression";
  },
  handle(node, indent='') {
    return indent + `${handler(node.object)}.${handler(node.property)}`;
  },
};

export const callHandler: Handler = {
  test(node) {
    return node.type === "CallExpression";
  },
  handle(node, indent='') {
    return indent + `${handler(node.callee)}(${node.arguments
      .map((n) => handler(n))
      .join(", ")})`;
  },
};

export const identifierHandler: Handler = {
  test(node) {
    return node.type === "Identifier";
  },
  handle(node, indent='') {
    let code = indent + node.name;
    console.log('parsing identifier:', node.name);
    console.log('defined before:', handler.scope.has(node.name));
    console.log('-------------');
    return code;
  },
};

export const binaryExpressionHandler: Handler = {
  test(node) {
    return node.type === "BinaryExpression";
  },
  handle(node, indent='') {
    return indent + `${handler(node.left)} ${node.operator} ${handler(node.right)}`;
  },
};

export const parenthesizedExpression: Handler = {
  test(node) {
    return node.type === "ParenthesizedExpression";
  },
  handle(node, indent = "") {
    return indent + `(${handler(node.expression, "")})`;
  },
};

// ----------------
/*
Identifier
PrivateName
Literals
RegExpLiteral
NullLiteral
StringLiteral
BooleanLiteral
NumericLiteral
BigIntLiteral
DecimalLiteral
Programs
Functions
Statements
ExpressionStatement
BlockStatement
EmptyStatement
DebuggerStatement
WithStatement
ReturnStatement
LabeledStatement
BreakStatement
ContinueStatement
Choice
IfStatement
SwitchStatement
SwitchCase
Exceptions
ThrowStatement
TryStatement
CatchClause
Loops
WhileStatement
DoWhileStatement
ForStatement
ForInStatement
ForOfStatement
Declarations
FunctionDeclaration
VariableDeclaration
VariableDeclarator
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
SpreadElement
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
Patterns
ObjectPattern
ArrayPattern
RestElement
AssignmentPattern
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
Imports
ImportDeclaration
ImportSpecifier
ImportDefaultSpecifier
ImportNamespaceSpecifier
ImportAttribute
Exports
ExportNamedDeclaration
ExportSpecifier
ExportDefaultDeclaration
ExportAllDeclaration
*/
