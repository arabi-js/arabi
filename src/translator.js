function __arjs__translate__(o, m) {
  let proxyHandler = {
    get(target, prop) {
      if (prop in target) return target[prop];
      let v = m[prop];
      if (v)
      if (typeof v === 'string') {
        Object.defineProperty(target, prop, { value: target[v] });
        return target[v];
      } else if (!v[2]) {
        // we translate another object in the targeted propperty
        let _v = __arjs__translate__(target[v[0]], v[1]);
        Object.defineProperty(target, prop, { value: _v });
        return _v;
      } else if (v === true) {
        // we translate the result of a function
        let _v = function(){ return __arjs__translate__(target[v[0]](...arguments), v[1]) };
        Object.defineProperty(target, prop, { value: _v });
        return _v;
      } else if (typeof v[2] === 'object') {
        // translate the function with the first map, and the function's result with the other.
        let _v = function(){ return __arjs__translate__(target[v[0]](...arguments), v[2]) };
        _v = __arjs__translate__(_v, v[1]);
        Object.defineProperty(target, prop, { value: _v });
        return _v;
      } else {
        throw "unexpected translation map!\nwe accept only one of these three arrays whose first element is the actual prop name, the second is object if you are translating object, if you translating the result of a function then the 3rd is (true), if you want to translate the function and translate also its results you have to pass the second elemet of the array to be the function tmap, and the second as the function's result tmap."
      }
      return undefined;
    },
    
    set(target, prop, value) {
      if(prop in m) {
        prop = m[prop];
        if (typeof prop !== 'string') prop = prop[0];
      }
      target[prop] = value;
      return true;
    },

    // has(target, prop) {
    //   return true;
    // },
    // apply(target, prop) {
    // },
    // construct() {
    //   console.log(arguments);
    // },
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
  }
  return new Proxy(o, proxyHandler);
}
