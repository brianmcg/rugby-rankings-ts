const cache = new Map();

export default function Cache({ dataKey }) {
  return {
    dataKey,

    has(key) {
      return cache.has(key);
    },

    set(key, value) {
      return cache.set(key, value);
    },

    get(key) {
      return cache.get(key);
    },

    delete(key) {
      return cache.delete(key);
    },

    clear() {
      return cache.clear();
    },
  };
}
