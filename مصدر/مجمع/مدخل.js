import handlers from './معالجات/مدخل'

export default function handler(node) {
  if (node) for (let h of handlers) {
    if (h.test(node)) {
      return h.handle(node);
    }
  }
}
