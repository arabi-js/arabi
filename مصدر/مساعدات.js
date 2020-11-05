/*
 *
 * @param {object} o to be translated
 * @param {object} m translation map
 */
export function getTranslatedObj(o, m) {
  let proxyHandler = {
    get(target, prop) {
      if (prop in target) return target[prop];
      let v = m[prop];
      if (typeof v === 'string') {
        Object.defineProperty(target, v, { value: target[v] });
        return target[v];
      } else if (!v[2]) {
        let _v = getTranslatedObj(target[v[0]], v[1]);
        Object.defineProperty(target, v[1], { value: _v });
        return _v;
      } if (v) {
        let _v = () => getTranslatedObj(target[v[0]](...arguments), v[1]);
        Object.defineProperty(target, v[1], { value: _v });
        return _v;
      }
      return undefined;
    },
    has(target, prop) {
      return true;
    },
    apply(target, prop) {

    },
    construct() {
      console.log(arguments);
    },
    hasProperty(target, prop) {
      return true;
    },
    getPrototypeOf(target, prop) {
      return Object.getPrototypeOf(o);
    },
    setPrototypeOf(target, prop) {
      return true;
    },
    isExtensible(target, prop) {
      return true;
    },
    preventExtensions(target, prop) {
      return true;
    },
    defineProperty(target, prop) {
      return true;
    },
    getOwnPropertyDescriptor(target, prop) {
      return true;
    },
    ownKeys(target, prop) {
      return true;
    },
  }

  return new Proxy(o, proxyHandler);
}

export function getGlobalTranslator() {
  return '';
}

