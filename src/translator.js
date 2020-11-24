function __arjs__translate__(o, m) {
  let proxyHandler = {
    get(target, prop) {
      if (prop in target) return target[prop];
      let v = m[prop];
      if (typeof v === 'string') {
        Object.defineProperty(target, prop, { value: target[v] });
        return target[v];
      } else if (!v[2]) {
        // we translate another object in the targeted propperty
        let _v = __arjs__translate__(target[v[0]], v[1]);
        Object.defineProperty(target, prop, { value: _v });
        return _v;
      } else if (v) {
        // we translate the result of a function
        let _v = () => __arjs__translate__(target[v[0]](...arguments), v[1]);
        Object.defineProperty(target, prop, { value: _v });
        return _v;
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
