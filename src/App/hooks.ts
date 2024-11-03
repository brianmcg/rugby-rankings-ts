import { useReducer, useEffect, Dispatch } from 'react';
import { rankingsReducer } from './reducers';
import { ACTIONS } from './actions';
import { State, Data, Sport } from '@constants/types';
import type { Action } from './types';

const cache = new Map<Sport, Data>();

export const useAsync = (
  asyncCallback: (sport: Sport, date?: Date) => Promise<Data>,
  initialState: State,
): [State, Dispatch<Action>] => {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const { sport } = state;

  useEffect(() => {
    const cached = cache.get(sport);

    if (cached) {
      dispatch({
        type: ACTIONS.CACHE_FETCH_SUCCESS,
        payload: { data: cached },
      });

      return;
    }

    dispatch({ type: ACTIONS.FETCH_START });

    asyncCallback(sport).then(
      data => {
        cache.set(sport, data);
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } });
      },
      () => dispatch({ type: ACTIONS.FETCH_ERROR }),
    );
  }, [asyncCallback, sport]);

  return [state, dispatch];
};
