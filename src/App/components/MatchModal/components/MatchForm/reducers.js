import { ACTIONS } from './actions';
import { validateScore, validateTeam } from '@utils/validate';

function isMatchComplete(match) {
  const { homeTeam, awayTeam, homeScore, awayScore } = match;

  return validateTeam(homeTeam)
    && validateTeam(awayTeam)
    && validateScore(homeScore)
    && validateScore(awayScore);
}

export function matchReducer(state, action) {
  switch (action.type) {
  case ACTIONS.CHANGE_HOME_TEAM: {
    const { homeTeam } = action.payload;
    const { awayTeam, homeScore, awayScore } = state;
    const isComplete = isMatchComplete({ homeTeam, awayTeam, homeScore, awayScore });

    return { ...state, homeTeam, isComplete };
  }
  case ACTIONS.CHANGE_AWAY_TEAM: {
    const { awayTeam } = action.payload;
    const { homeTeam, homeScore, awayScore } = state;
    const isComplete = isMatchComplete({ homeTeam, awayTeam, homeScore, awayScore });

    return { ...state, awayTeam, isComplete };

  }
  case ACTIONS.CHANGE_HOME_SCORE: {
    const { homeTeam, awayTeam, awayScore } = state;
    const { homeScore } = action.payload;
    const isComplete = isMatchComplete({ homeTeam, awayTeam, homeScore, awayScore });

    return { ...state, homeScore, isComplete };
  }
  case ACTIONS.CHANGE_AWAY_SCORE: {
    const { homeTeam, awayTeam, homeScore } = state;
    const { awayScore } = action.payload;
    const isComplete = isMatchComplete({ homeTeam, awayTeam, homeScore, awayScore });

    return { ...state, awayScore, isComplete };
  }
  case ACTIONS.CHANGE_IS_NEUTRAL_VENUE: {
    const { isNeutralVenue } = action.payload;
    const isComplete = isMatchComplete(state);

    return { ...state, isNeutralVenue, isComplete };
  }
  case ACTIONS.CHANGE_IS_WORLD_CUP: {
    const { isWorldCup } = action.payload;
    const isComplete = isMatchComplete(state);

    return { ...state, isWorldCup, isComplete };
  }
  default: {
    return state;
  }}
}
