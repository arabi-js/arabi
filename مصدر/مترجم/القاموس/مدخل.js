// @flow

import * as handlers from './معالجات';
import { type Translator } from '../../أنواع.js';

// here we want types and translators as key value pairs
let dictionary = {};

// specify a translator for each type
Object.values(handlers).forEach((h: Translator) => {
  h.types.forEach((t) => {
    dictionary[t] = h.translate;
  });
});

export default dictionary;
