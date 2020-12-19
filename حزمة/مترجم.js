exports.default = function __arabi__translate__(obj, map, options={}) {
  let proxyHandler = {};
  
  if (map) {
    if (map instanceof Function) map = map(obj); // dynamic maps
    let mapMap = [[], []]; // [arabicKey[], originalKey[]]
    Object.entries(map).forEach(([k, v])=>{
      let _k = (typeof v === 'string') ? v : v[0];
      mapMap[0].push(k);
      mapMap[1].push(_k);
    });
    Object.assign(proxyHandler, {
      get(target, prop, receiver) {
        let v = map[prop];
        if (v && !(prop in target)) {
          if (typeof v === 'string') {
            let value = target[v];
            value = typeof value == 'function' ? value.bind(target) : value;
            return value;
          }
          if (v[1] || v[2]) {
            // we translate another object in the targeted propperty
            let value = target[v[0]];
            value = typeof value == 'function' ? value.bind(target) : value;
            let translatedObject = __arabi__translate__(value, v[1], v[2]);
            Object.defineProperty(target, prop, { value: translatedObject });
            return translatedObject;
          } 
          throw new Error("unexpecting thing happened while translation (@arabi)");
        }
        let value = target[prop];
        value = typeof value == 'function' ? value.bind(target) : value;
        return value;
      },
      
      set(target, prop, value) {
        let validSetting = true;
        if(prop in map) {
          prop = map[prop];
          if (typeof prop !== 'string') prop = prop[0];
        }
        let i;
        if ((i = mapMap[1].indexOf[prop]) > -1) {
          // delete the cached value, translate again when getting using the arabic key.
          validSetting = delete target[mapMap[0][i]];
        }
        target[prop] = value;
        return validSetting;
      },
      
      has(target, prop) {
        if (prop in map) prop = map[prop];
        prop === typeof prop === 'string' ? prop : prop[0];
        return prop in target;
      },
      
      // hasProperty(target, prop) {
      //   return true;
      // },
      // getPrototypeOf(target, prop) {
      //   return Object.getPrototypeOf(o);
      // },
      // setPrototypeOf(target, prop) {
      //   return true;
      // },
      // isExtensible(target, prop) {
      //   return true;
      // },
      // preventExtensions(target, prop) {
      //   return true;
      // },
      // defineProperty(target, prop) {
      //   return true;
      // },
      // getOwnPropertyDescriptor(target, prop) {
      //   return true;
      // },
      // ownKeys(target, prop) {
      //   return true;
      // },
    });
  }

  if (options && options.returnMap) {
    proxyHandler.apply = function(target, thisArg, args) {
      let value = Reflect.apply(target, thisArg, args);
      let _map = options.returnMap[0],
        _options = options.returnMap[1];
      if (_map || _options) 
        value = __arabi__translate__(value, _map, _options);
      return value;
    }
  }

  if (options && options.constructMap) {
    proxyHandler.construct = function(target, args) {
      let value = Reflect.construct(target, args);
      let _map = options.constructMap[0],
        _options = options.constructMap[1];
      if (_map || _options) 
        value = __arabi__translate__(value, _map, _options);
      return value;
    }
  }

  return new Proxy(obj, proxyHandler);
}
