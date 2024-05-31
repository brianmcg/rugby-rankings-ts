import type { Team, Entry, ParsedMatch } from '@types';

const cache = new Map();

type CacheProps = {
  dataKey: string;
};

type ValueProps = {
  sport: string;
  label: string;
  teams: Team[];
  rankings: Entry[];
  matches: ParsedMatch[];
  startDate: string;
  endDate: string;
};

export default function Cache(props: CacheProps) {
  const { dataKey } = props;

  return {
    dataKey,

    has(key: string) {
      return cache.has(key);
    },

    set(key: string, value: ValueProps) {
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
