import { type Handler } from '../../أنواع';

export const identifierHandler: Handler = {
  types: ['Identifier'],
  handle(node, indent = '') {
    return indent + node.name;
  },
};
