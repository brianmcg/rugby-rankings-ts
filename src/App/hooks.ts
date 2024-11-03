import { useReducer, useEffect, Dispatch } from 'react';
import { State, Data, Sport } from '@constants/types';
import { fetchData } from '@utils/api';
import { SportEnum } from '@constants/enums';
import { rankingsReducer } from './reducers';
import { ACTIONS } from './actions';
import type { Action } from './types';

const cache = new Map<Sport, Data>();

const initialState = {
  data: null,
  fetchedData: {
    [SportEnum.MENS]: null,
    [SportEnum.WOMENS]: null,
  },
  isError: false,
  isLoading: true,
  selectedMatch: null,
  sport: SportEnum.MENS,
};

export const useFetchData = (): [State, Dispatch<Action>] => {
  const [state, dispatch] = useReducer(rankingsReducer, initialState);
  const { sport, data } = state;

  useEffect(() => {
    const cachedData = cache.get(sport);

    if (cachedData) {
      dispatch({
        type: ACTIONS.CACHE_FETCH_SUCCESS,
        payload: { data: cachedData },
      });

      return;
    }

    dispatch({ type: ACTIONS.FETCH_START });

    fetchData(sport).then(
      data => dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } }),
      () => dispatch({ type: ACTIONS.FETCH_ERROR }),
    );
  }, [sport]);

  useEffect(() => {
    const cacheKey = data?.sport;

    if (cacheKey) {
      cache.set(cacheKey, data);
    }
  }, [data]);

  return [state, dispatch];
};
