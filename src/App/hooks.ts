import { useReducer, useEffect } from 'react';
import { rankingsReducer } from './reducers';
import { ACTIONS } from './actions';
import type { ParsedMatch, State, Data } from '@types';

// type UseAsyncProps = {
//   asyncCallback: () => void;
//   initialState: State;
//   cache: object;
// };

export function useAsync(
  asyncCallback: () => void,
  initialState: State,
  cache: object,
) {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const cacheKey = state[cache.dataKey];

  useEffect(() => {
    const data = cache?.get(cacheKey);

    if (data) {
      dispatch({ type: ACTIONS.CACHE_FETCH_SUCCESS, payload: { data } });
      return;
    }

    dispatch({ type: ACTIONS.FETCH_START });

    asyncCallback(cacheKey).then(
      data => dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } }),
      error => dispatch({ type: ACTIONS.FETCH_ERROR, payload: { error } }),
    );
  }, [cacheKey, asyncCallback, cache]);

  return [state, dispatch];
}

export function useUpdateCache(cache: object, data: Data) {
  useEffect(() => {
    const cacheKey = data?.[cache.dataKey];

    if (cacheKey) {
      cache.set(cacheKey, data);
    }
  }, [data, cache]);
}
