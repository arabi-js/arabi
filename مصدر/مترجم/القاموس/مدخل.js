// @flow

import * as handlers from './معالجات';
import { type Translator } from '../../أنواع.js';

let dictionary = {};
Object.values(handlers).forEach((h: Translator) => {
  h.types.forEach((t) => {
    dictionary[t] = h.translate;
  });
});

export default dictionary;
