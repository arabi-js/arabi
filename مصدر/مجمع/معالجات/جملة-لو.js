import handler from "../مدخل";

export default {
  test(node) {
    return node.type === "IfStatement";
  },
  handle(node) {
    return [
      `if (${handler(node.test)}) ` + handler(node.consequent),
      node.alternate && "else " + handler(node.alternate),
    ]
      .filter(Boolean)
      .join("\n");
  },
};
