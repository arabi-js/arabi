import { parse as __flatted__parse__ } from 'flatted';

// the main purpose of such a module, is translte the module only here.
// so we are avoiding creating many proxies doing the same thing.
import m from 'jquery';
// import * as all from 'MODULE_NAME';
import { translate } from '@arabi/translate';

const options = __flatted__parse__('[{"returnMap":"1"},{}]');
const map = __flatted__parse__('[{}]');

// TODO:
// translate "all" with map if `options.defaultMap`
// then the new map will be the default translation map

export default translate(m, map, options);
