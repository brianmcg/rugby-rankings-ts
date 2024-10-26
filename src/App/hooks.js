import { useReducer, useEffect } from 'react';
import { rankingsReducer } from './reducers';
import { ACTIONS } from './actions';

export function useAsync(asyncCallback, initialState, cache) {
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

export function useUpdateCache(cache, data) {
  useEffect(() => {
    const cacheKey = data?.[cache.dataKey];

    if (cacheKey) {
      cache.set(cacheKey, data);
    }
  }, [data, cache]);
}
