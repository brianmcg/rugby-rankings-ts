import { ACTIONS } from './actions';
import { calculateRankingChange } from './helpers';
import type { State } from '@constants/types';
import type {
  Action,
  DataPayload,
  MatchesPayload,
  MatchIdPayload,
  MatchPayload,
  SportPayload,
} from './types';

let matchIdCounter = 0;

const newMatch = {
  awayScore: null,
  awayTeam: null,
  homeScore: null,
  homeTeam: null,
  isComplete: false,
  isNeutralVenue: false,
  competition: null,
  isWorldCup: false,
  matchId: null,
  time: null,
  venue: null,
};

const onFetchStart = (state: State): State => ({
  ...state,
  isLoading: true,
  isError: false,
});

const onFetchSuccess = (state: State, payload: DataPayload): State => {
  const { data } = payload;
  const { rankings, matches, sport } = data;

  return {
    ...state,
    data: { ...data, rankings: calculateRankingChange(rankings, matches) },
    fetchedData: { ...state.fetchedData, [sport]: data },
    isLoading: false,
  };
};

const onCacheFetchSuccess = (state: State, payload: DataPayload): State => ({
  ...state,
  data: payload.data,
  isLoading: false,
});

const onFetchError = (state: State): State => ({
  ...state,
  isError: true,
  isLoading: false,
});

const onChangeSport = (state: State, payload: SportPayload): State => ({
  ...state,
  sport: payload.sport,
});

const onSelectMatch = (state: State, payload: MatchPayload): State => ({
  ...state,
  selectedMatch: payload.match,
});

const onCreateMatch = (state: State): State => ({
  ...state,
  selectedMatch: newMatch,
});

const onUnselectMatch = (state: State): State => ({
  ...state,
  selectedMatch: null,
});

const onAddMatch = (state: State, payload: MatchPayload): State => {
  const { data, fetchedData, sport } = state;

  if (data && fetchedData && sport) {
    const matches = [
      ...data.matches,
      { ...payload.match, matchId: `new-${matchIdCounter++}` },
    ];

    const { rankings: initialRankings } = fetchedData[sport] ?? {};

    if (initialRankings) {
      const rankings = calculateRankingChange(initialRankings, matches);

      return {
        ...state,
        data: { ...data, rankings, matches },
        selectedMatch: null,
      };
    }

    return state;
  }

  return state;
};

const onUpdateMatch = (state: State, payload: MatchPayload): State => {
  const { data, fetchedData, sport } = state;

  if (data && fetchedData && sport) {
    const matches = data.matches.map(match => {
      if (match.matchId === payload.match?.matchId) {
        return { ...payload.match };
      }

      return match;
    });

    const { rankings: initialRankings } = fetchedData[sport] ?? {};

    if (initialRankings) {
      const rankings = calculateRankingChange(initialRankings, matches);

      return {
        ...state,
        data: { ...data, rankings, matches },
        selectedMatch: null,
      };
    }

    return state;
  }

  return state;
};

const onRemoveMatch = (state: State, payload: MatchIdPayload): State => {
  const { data, fetchedData, sport } = state;

  if (data && fetchedData && sport) {
    const matches = data.matches.filter(
      match => match.matchId !== payload.matchId,
    );

    const { rankings: initialRankings } = fetchedData[sport] ?? {};

    if (initialRankings) {
      const rankings = calculateRankingChange(initialRankings, matches);

      return { ...state, data: { ...data, rankings, matches } };
    }

    return state;
  }

  return state;
};

const onUpdateMatches = (state: State, payload: MatchesPayload): State => {
  const { data, fetchedData, sport } = state;
  const { matches } = payload;

  if (data && fetchedData && sport) {
    const { rankings: initialRankings } = fetchedData[sport] ?? {};

    if (initialRankings) {
      const rankings = calculateRankingChange(initialRankings, matches);
      return { ...state, data: { ...data, rankings, matches } };
    }
    return state;
  }

  return state;
};

export const rankingsReducer = (
  state: State,
  { type, payload }: Action,
): State => {
  switch (type) {
    case ACTIONS.FETCH_START: {
      return onFetchStart(state);
    }
    case ACTIONS.FETCH_SUCCESS: {
      return onFetchSuccess(state, payload as DataPayload);
    }
    case ACTIONS.CACHE_FETCH_SUCCESS: {
      return onCacheFetchSuccess(state, payload as DataPayload);
    }
    case ACTIONS.FETCH_ERROR: {
      return onFetchError(state);
    }
    case ACTIONS.ADD_MATCH: {
      return onAddMatch(state, payload as MatchPayload);
    }
    case ACTIONS.REMOVE_MATCH: {
      return onRemoveMatch(state, payload as MatchIdPayload);
    }
    case ACTIONS.UPDATE_MATCH: {
      return onUpdateMatch(state, payload as MatchPayload);
    }
    case ACTIONS.SELECT_MATCH: {
      return onSelectMatch(state, payload as MatchPayload);
    }
    case ACTIONS.CREATE_MATCH: {
      return onCreateMatch(state);
    }
    case ACTIONS.UNSELECT_MATCH: {
      return onUnselectMatch(state);
    }
    case ACTIONS.UPDATE_MATCHES: {
      return onUpdateMatches(state, payload as MatchesPayload);
    }
    case ACTIONS.CHANGE_SPORT: {
      return onChangeSport(state, payload as SportPayload);
    }
    default: {
      return state;
    }
  }
};
