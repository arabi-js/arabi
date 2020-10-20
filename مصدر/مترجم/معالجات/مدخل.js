import * as handlers from './معالجات';

let typeHandlers = {};
Object.values(handlers).forEach((h) => {
  h.types.forEach((t) => {
    typeHandlers[t] = h.handle;
  });
});

export default typeHandlers;
