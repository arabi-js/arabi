// the main putpose of such a module, is translte the module only here.
// so we are avoiding creating many proxies doing the same thing.

import m from 'MODULE_NAME';
import { translate } from 'arjs-translate';

export default translate(m, MODULE_MAP, MAP_OPTIONS);

