import { ACTIONS } from './actions';
import { validateScore, validateTeam } from '@utils/validate';
import type { ParsedMatch, Team } from '@constants/types';

type TeamPayload = { team: Team | null };

type ScorePayload = { score: number | null };

type SelectedPayload = { isSelected: boolean };

type Action = {
  type: string;
  payload: TeamPayload | ScorePayload | SelectedPayload;
};

function isMatchComplete({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
}: {
  homeTeam: Team | null;
  awayTeam: Team | null;
  homeScore: number | null;
  awayScore: number | null;
}) {
  return (
    validateTeam(homeTeam) &&
    validateTeam(awayTeam) &&
    validateScore(homeScore) &&
    validateScore(awayScore)
  );
}

export function matchReducer(state: ParsedMatch, action: Action) {
  switch (action.type) {
    case ACTIONS.CHANGE_HOME_TEAM: {
      const { team: homeTeam } = action.payload as TeamPayload;
      const { awayTeam, homeScore, awayScore } = state;
      const isComplete = isMatchComplete({
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
      });

      return { ...state, homeTeam, isComplete };
    }
    case ACTIONS.CHANGE_AWAY_TEAM: {
      const { team: awayTeam } = action.payload as TeamPayload;
      const { homeTeam, homeScore, awayScore } = state;
      const isComplete = isMatchComplete({
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
      });

      return { ...state, awayTeam, isComplete };
    }
    case ACTIONS.CHANGE_HOME_SCORE: {
      const { homeTeam, awayTeam, awayScore } = state;
      const { score: homeScore } = action.payload as ScorePayload;
      const isComplete = isMatchComplete({
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
      });

      return { ...state, homeScore, isComplete };
    }
    case ACTIONS.CHANGE_AWAY_SCORE: {
      const { homeTeam, awayTeam, homeScore } = state;
      const { score: awayScore } = action.payload as ScorePayload;
      const isComplete = isMatchComplete({
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
      });

      return { ...state, awayScore, isComplete };
    }
    case ACTIONS.CHANGE_IS_NEUTRAL_VENUE: {
      const { isSelected: isNeutralVenue } = action.payload as SelectedPayload;
      const isComplete = isMatchComplete(state);

      return { ...state, isNeutralVenue, isComplete };
    }
    case ACTIONS.CHANGE_IS_WORLD_CUP: {
      const { isSelected: isWorldCup } = action.payload as SelectedPayload;
      const isComplete = isMatchComplete(state);

      return { ...state, isWorldCup, isComplete };
    }
    default: {
      return state;
    }
  }
}
