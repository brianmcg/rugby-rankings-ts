import { ACTIONS } from './actions';
import { calculateRankingChange } from './helpers';
import type { State, ParsedMatch, Sport, Data } from '@constants/types';

type MatchPayload = { match: ParsedMatch | null };

type MatchIdPayload = { matchId: string };

type MatchesPayload = { matches: Array<ParsedMatch> };

type SportPayload = { sport: Sport };

type DataPayload = { data: Data };

type Payload =
  | DataPayload
  | SportPayload
  | MatchPayload
  | MatchIdPayload
  | MatchesPayload;

export type Action = {
  type: string;
  payload?: Payload;
};

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

function onFetchStart(state: State): State {
  return {
    ...state,
    isLoading: true,
    isError: false,
  };
}

function onFetchSuccess(state: State, payload: DataPayload): State {
  const { data } = payload;
  const { rankings, matches, sport } = data;

  return {
    ...state,
    data: { ...data, rankings: calculateRankingChange(rankings, matches) },
    initialData: { ...state.initialData, [sport]: data },
    isLoading: false,
  };
}

function onCacheFetchSuccess(state: State, payload: DataPayload): State {
  return {
    ...state,
    data: payload.data,
    isLoading: false,
  };
}

function onFetchError(state: State): State {
  return {
    ...state,
    isError: true,
    isLoading: false,
  };
}

function onChangeSport(state: State, payload: SportPayload): State {
  return {
    ...state,
    sport: payload.sport,
  };
}

function onSelectMatch(state: State, payload: MatchPayload): State {
  if (payload.match === null) {
    return { ...state, selectedMatch: null };
  }

  return { ...state, selectedMatch: payload.match ? payload.match : newMatch };
}

function onAddMatch(state: State, payload: MatchPayload): State {
  const { data, initialData, sport } = state;

  if (data && initialData && sport) {
    const matches = [
      ...data.matches,
      { ...payload.match, matchId: `new-${matchIdCounter++}` },
    ];

    const { rankings: initialRankings } = initialData[sport] ?? {};

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
}

function onUpdateMatch(state: State, payload: MatchPayload): State {
  const { data, initialData, sport } = state;

  if (data && initialData && sport) {
    const matches = data.matches.map(match => {
      if (match.matchId === payload.match?.matchId) {
        return { ...payload.match };
      }

      return match;
    });

    const { rankings: initialRankings } = initialData[sport] ?? {};

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
}

function onRemoveMatch(state: State, payload: MatchIdPayload): State {
  const { data, initialData, sport } = state;

  if (data && initialData && sport) {
    const matches = data.matches.filter(
      match => match.matchId !== payload.matchId,
    );

    const { rankings: initialRankings } = initialData[sport] ?? {};

    if (initialRankings) {
      const rankings = calculateRankingChange(initialRankings, matches);

      return { ...state, data: { ...data, rankings, matches } };
    }

    return state;
  }

  return state;
}

function onUpdateMatches(state: State, payload: MatchesPayload): State {
  const { data, initialData, sport } = state;
  const { matches } = payload;

  if (data && initialData && sport) {
    const { rankings: initialRankings } = initialData[sport] ?? {};

    if (initialRankings) {
      const rankings = calculateRankingChange(initialRankings, matches);
      return { ...state, data: { ...data, rankings, matches } };
    }
    return state;
  }

  return state;
}

export function rankingsReducer(
  state: State,
  { type, payload }: Action,
): State {
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
}
