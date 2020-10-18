import { type Node } from '../babel-parser/src/types.js';

export interface Handler {
  test: (node: Node) => boolean,
  handle: (node: Node) => string
}
