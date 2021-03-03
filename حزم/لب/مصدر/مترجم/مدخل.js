// @flow

import dictionary from './القاموس/مدخل';
import manager from './مدير-الترجمة'; 
import { type Node } from '../../babel-parser/src/types.js';

// TODO: collect the scope variables as all functions and "var"s
// are defined at the begining, then "vars" are assigned
// when its declaration statement come;

export default function translate(node: Node, indent?: string): string {
  if (Array.isArray(node))
    return handleArray(
      node.map((a, i) => translate(a, !i ? indent : manager.indent))
    );
  if (node && node.type in dictionary) return dictionary[node.type](node, indent);
  manager.error(
    node,
    `نأسف أن ليس لدينا معالجات ترجمة لهذا مؤقتا: ${node.type}`,
    `we can't handle this syntax at the time: ${node.type}`
  );
}

export function handleArray(a: [ string | Array ]) {
  // reduce then join,,, built-in Array methods
  return a.reduce((newA, c)=>{
    // comma operator is used here, exec the ternary operator
    // then return the last expression which is `newA`
    return (
      typeof c === 'string' ? newA.push(c)
      : newA.push(
        this.voidline, this.handleArray(c), this.voidline
      ), /* returned value */ newA
    );
  }, []).join('');
}
