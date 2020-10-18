import handler from "../مدخل";
import { type Handler } from '../../أنواع.js';

export const literalHandler: Handler = {
  test(node) {
    return /[A-Z][a-z]*Literal$/.test(node.type);
  },
  handle(node) {
    switch (node.type) {
      case "StringLiteral":
        return node.extra.raw;
      default:
        return node.value;
    }
  },
};
