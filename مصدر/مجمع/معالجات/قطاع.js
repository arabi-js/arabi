import handler from "../مدخل";
import { indent } from "../../إعدادت";

export default {
  test(node) {
    return node.type === "BlockStatement";
  },
  handle(node) {
    return [
      "{",
      handler(node.body)
        .split("\n")
        .map((l) => (l ? indent + l : ""))
        .join("\n"),
      "}",
    ].join("\n");
  },
};
