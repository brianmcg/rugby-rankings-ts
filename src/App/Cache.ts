import type { Data } from '@types';

const cache = new Map();

type CacheProps = {
  dataKey: string;
};

export default function Cache(props: CacheProps) {
  const { dataKey } = props;

  return {
    dataKey,

    has(key: string) {
      return cache.has(key);
    },

    set(key: string, value: Data) {
      return cache.set(key, value);
    },

    get(key: string) {
      return cache.get(key);
    },

    delete(key: string) {
      return cache.delete(key);
    },

    clear() {
      return cache.clear();
    },
  };
}

// export default class Cache {
//   private dataKey: string;

//   constructor(props: CacheProps) {
//     this.dataKey = props.dataKey;
//   }

//   getDataKey() {
//     return this.dataKey;
//   }

//   has(key: string) {
//     return cache.has(key);
//   }

//   set(key: string, value: Data) {
//     return cache.set(key, value);
//   }

//   get(key: string) {
//     return cache.get(key);
//   }

//   delete(key: string) {
//     return cache.delete(key);
//   }

//   clear() {
//     return cache.clear();
//   }
// }
