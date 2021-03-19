// the main purpose of such a module, is translte the module only here.
// so we are avoiding creating many proxies doing the same thing.
import m from 'MODULE_NAME';
// import * as all from 'MODULE_NAME';
import { translate } from '@arabi/translate';

const options = MAP_OPTIONS;
const map = MODULE_MAP;

// TODO:
// translate "all" with map if `options.defaultMap`
// then the new map will be the default translation map

export default translate(m, map, options);
