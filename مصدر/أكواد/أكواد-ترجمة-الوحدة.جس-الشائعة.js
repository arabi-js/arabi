// the main purpose of such a module, is translte the module only here.
// so we are avoiding creating many proxies doing the same thing.

const m = require('MODULE_NAME');
const { translate } = require('arjs-translate');

module.exports = translate(m, MODULE_MAP, MAP_OPTIONS);
