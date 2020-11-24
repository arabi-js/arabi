// the main putpose of such a module, is translte the module only here.
// so we are avoiding creating many proxies doing the same thing.

import module from 'MODULE_NAME';
import { translate } from 'arjs-translate.js';

export default translate(module, MODULE_MAP);

