import { ACTIONS } from './actions';
import { calculateRankingChange } from './helpers';

let matchIdCounter = 0;

const newMatch = {
  awayScore: null,
  awayTeam: null,
  homeScore: null,
  homeTeam: null,
  isComplete: false,
  isNeutralVenue: false,
  isWorldCup: false,
  matchId: null,
  time: null,
  venue: null,
};

function onFetchStart(state) {
  return { ...state, isLoading: true, isError: false };
}

function onFetchSuccess(state, payload) {
  const { data } = payload;
  const { rankings, matches, sport } = data;

  return {
    ...state,
    data: { ...data, rankings: calculateRankingChange(rankings, matches) },
    initialData: { ...state.initialData, [sport]: data },
    isLoading: false,
  };
}

function onCacheFetchSuccess(state, payload) {
  return { ...state, data: payload.data, isLoading: false };
}

function onFetchError(state) {
  return { ...state, isError: true, isLoading: false };
}

function onChangeSport(state, payload) {
  return { ...state, sport: payload.sport };
}

function onSelectMatch(state, payload) {
  if (payload.match === null) {
    return { ...state, selectedMatch: null };
  }

  return { ...state, selectedMatch: payload.match ? payload.match : newMatch };
}

function onAddMatch(state, payload) {
  const matches = [
    ...state.data.matches,
    { ...payload.match, matchId: `new-${matchIdCounter++}` },
  ];

  const rankings = calculateRankingChange(state.initialData[state.sport].rankings, matches);

  return { ...state, data: { ...state.data, rankings, matches }, selectedMatch: null };
}

function onUpdateMatch(state, payload) {
  const matches = state.data.matches.map(match => {
    if (match.matchId === payload.match.matchId) {
      return { ...payload.match };
    }

    return match;
  });

  const rankings = calculateRankingChange(state.initialData[state.sport].rankings, matches);

  return { ...state, data: { ...state.data, rankings, matches }, selectedMatch: null };
}

function onRemoveMatch(state, payload) {
  const matches = state.data.matches.filter(match => match.matchId !== payload.matchId);
  const rankings = calculateRankingChange(state.initialData[state.sport].rankings, matches);

  return { ...state, data: { ...state.data, rankings, matches } };
}

function onupdateMatches(state, payload) {
  const { matches } = payload;
  const rankings = calculateRankingChange(state.initialData[state.sport].rankings, matches);
  return { ...state, data: { ...state.data, rankings, matches } };
}

export function rankingsReducer(state, { type, payload }) {
  switch (type) {
  case ACTIONS.FETCH_START: {
    return onFetchStart(state, payload);
  }
  case ACTIONS.FETCH_SUCCESS: {
    return onFetchSuccess(state, payload);
  }
  case ACTIONS.CACHE_FETCH_SUCCESS: {
    return onCacheFetchSuccess(state, payload);
  }
  case ACTIONS.FETCH_ERROR: {
    return onFetchError(state, payload);
  }
  case ACTIONS.ADD_MATCH: {
    return onAddMatch(state, payload);
  }
  case ACTIONS.REMOVE_MATCH: {
    return onRemoveMatch(state, payload);
  }
  case ACTIONS.UPDATE_MATCH: {
    return onUpdateMatch(state, payload);
  }
  case ACTIONS.SELECT_MATCH: {
    return onSelectMatch(state, payload);
  }
  case ACTIONS.UPDATE_MATCHES: {
    return onupdateMatches(state, payload);
  }
  case ACTIONS.CHANGE_SPORT: {
    return onChangeSport(state, payload);
  }
  default: {
    return state;
  }}
}
