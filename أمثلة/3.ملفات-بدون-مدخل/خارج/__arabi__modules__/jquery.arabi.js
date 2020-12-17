/*****/ // the main purpose of such a module, is translte the module only here.
/*****/ // so we are avoiding creating many proxies doing the same thing.
/*****/ 
/*****/ const { parse: __flatted__parse__ } = require("flatted");

/*****/ const m = require('jquery');
/*****/ const { translate } = require('@arabi/translate');
/*****/ 
/*****/ module.exports = translate(m, __flatted__parse__("[{}]"), __flatted__parse__("[{\"returnMap\":\"1\"},{}]"));
/*****/ 