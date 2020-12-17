/*****/ // the main purpose of such a module, is translte the module only here.
/*****/ // so we are avoiding creating many proxies doing the same thing.
/*****/ 
/*****/ import { parse as __flatted__parse__ } from "flatted";

/*****/ import m from 'jquery';
/*****/ import { translate } from '@arabi/translate';
/*****/ 
/*****/ export default translate(m, __flatted__parse__("[{}]"), __flatted__parse__("[{\"returnMap\":\"1\"},{}]"));
/*****/ 
/*****/ 