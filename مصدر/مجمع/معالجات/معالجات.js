import handler from "../مدخل";

// المعالجات
import ifHandler from "./جملة-لو";
import blockHandler from "./قطاع";

export const literalHandler = {
  test(node) {
    return node.type === "Literal";
  },
  handle(node) {
    return typeof node.value === "string" ? '"' + node.value + '"' : node.value;
  },
};

export const sequenceHandler = {
  test(node) {
    return node instanceof Array;
  },
  handle(node) {
    return node.map((a) => handler(a)).join("\n\n");
  },
};

export const expressionHandler = {
  test(node) {
    return node.type === "ExpressionStatement";
  },
  handle(node) {
    return handler(node.expression) + ";";
  },
};

export const parenthesesHandler = {
  test(node) {
    return node.type === "Parentheses";
  },
  handle(node) {
    return `(${handler(node.content)})`;
  },
};

export const memExprHandler = {
  test(node) {
    return node.type === "MemberExpression";
  },
  handle(node) {
    return `${handler(node.object)}.${handler(node.property)}`;
  },
};

export const callHandler = {
  test(node) {
    return node.type === "CallExpression";
  },
  handle(node) {
    return `${handler(node.callee)}(${node.arguments.map((n) => handler(n)).join(", ")})`;
  },
};

export const idHandler = {
  test(node) {
    return node.type === "Identifier";
  },
  handle(node) {
    return node.name;
  },
};

export const infixOperatorsHandler = {
  test(node) {
    return node.type === "BinaryExpression";
  },
  handle(node) {
    return `${handler(node.left)} ${node.operator} ${handler(node.right)}`;
  },
};

// export const handler = {
//   test(node) {
//   },
//   handle(node) {
//   }
// }

// export const handler = {
//   test(node) {
//   },
//   handle(node) {
//   }
// }

export { ifHandler, blockHandler };
