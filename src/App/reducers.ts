import { ACTIONS } from './actions';
import { calculateRankingChange } from './helpers';
import type { ParsedMatch, State, Data } from '@types';

enum Sport {
  Mens = 'mru',
  Womens = 'wru',
}

type ReducerOptions = {
  type: string;
  payload: {
    data: Data;
    match: ParsedMatch;
    matches: ParsedMatch[];
    sport: string;
    matchId: string;
  };
};

let matchIdCounter = 0;

const newMatch = {
  matchId: null,
  homeTeam: null,
  homeScore: null,
  awayTeam: null,
  awayScore: null,
  competition: null,
  time: null,
  venue: null,
  isComplete: false,
  isNeutralVenue: false,
  isWorldCup: false,
};

export function rankingsReducer(state: State, options: ReducerOptions): State {
  const { type, payload } = options;
  const key = state.sport === Sport.Mens ? Sport.Mens : Sport.Womens;

  switch (type) {
  case ACTIONS.FETCH_START: {
    return { ...state, isLoading: true, isError: false };
  }
  case ACTIONS.FETCH_SUCCESS: {
    const { data } = payload;
    const { rankings, matches, sport } = data;

    return {
      ...state,
      data: { ...data, rankings: calculateRankingChange(rankings, matches) },
      initialData: { ...state.initialData, [sport]: data },
      isLoading: false,
    };
  }
  case ACTIONS.CACHE_FETCH_SUCCESS: {
    return { ...state, data: payload.data, isLoading: false };
  }
  case ACTIONS.FETCH_ERROR: {
    return { ...state, isError: true, isLoading: false };
  }
  case ACTIONS.ADD_MATCH: {
    const matches = [
      ...state.data.matches,
      { ...payload.match, matchId: `new-${matchIdCounter++}` },
    ];

    const rankings = calculateRankingChange(state.initialData[key].rankings, matches);

    return { ...state, data: { ...state.data, rankings, matches }, selectedMatch: null };
  }
  case ACTIONS.REMOVE_MATCH: {
    const matches = state.data.matches.filter((match: ParsedMatch) => match.matchId !== payload.matchId);
    const rankings = calculateRankingChange(state.initialData[key].rankings, matches);

    return { ...state, data: { ...state.data, rankings, matches } };
  }
  case ACTIONS.UPDATE_MATCH: {
    const matches = state.data.matches.map((match: ParsedMatch) => {
      if (match.matchId === payload.match.matchId) {
        return { ...payload.match };
      }

      return match;
    });

    const rankings = calculateRankingChange(state.initialData[key].rankings, matches);

    return { ...state, data: { ...state.data, rankings, matches }, selectedMatch: null };
  }
  case ACTIONS.SELECT_MATCH: {
    if (payload.match === null) {
      return { ...state, selectedMatch: null };
    }

    const selectedMatch = payload.match ?? newMatch;

    return { ...state, selectedMatch };
  }
  case ACTIONS.UPDATE_MATCHES: {
    const { matches } = payload;
    const rankings = calculateRankingChange(state.initialData[key].rankings, matches);
    return { ...state, data: { ...state.data, rankings, matches } };
  }
  case ACTIONS.CHANGE_SPORT: {
    return { ...state, sport: payload.sport };
  }
  default: {
    return state;
  }}
}
