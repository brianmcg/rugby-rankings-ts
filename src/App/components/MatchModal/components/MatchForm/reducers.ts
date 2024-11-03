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

export function matchReducer(match: ParsedMatch, action: Action): ParsedMatch {
  switch (action.type) {
    case ACTIONS.CHANGE_HOME_TEAM: {
      const { team: homeTeam } = action.payload as TeamPayload;
      const { awayTeam, homeScore, awayScore } = match;
      const isComplete = isMatchComplete({
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
      });

      return { ...match, homeTeam, isComplete };
    }
    case ACTIONS.CHANGE_AWAY_TEAM: {
      const { team: awayTeam } = action.payload as TeamPayload;
      const { homeTeam, homeScore, awayScore } = match;
      const isComplete = isMatchComplete({
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
      });

      return { ...match, awayTeam, isComplete };
    }
    case ACTIONS.CHANGE_HOME_SCORE: {
      const { homeTeam, awayTeam, awayScore } = match;
      const { score: homeScore } = action.payload as ScorePayload;
      const isComplete = isMatchComplete({
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
      });

      return { ...match, homeScore, isComplete };
    }
    case ACTIONS.CHANGE_AWAY_SCORE: {
      const { homeTeam, awayTeam, homeScore } = match;
      const { score: awayScore } = action.payload as ScorePayload;
      const isComplete = isMatchComplete({
        homeTeam,
        awayTeam,
        homeScore,
        awayScore,
      });

      return { ...match, awayScore, isComplete };
    }
    case ACTIONS.CHANGE_IS_NEUTRAL_VENUE: {
      const { isSelected: isNeutralVenue } = action.payload as SelectedPayload;
      const isComplete = isMatchComplete(match);

      return { ...match, isNeutralVenue, isComplete };
    }
    case ACTIONS.CHANGE_IS_WORLD_CUP: {
      const { isSelected: isWorldCup } = action.payload as SelectedPayload;
      const isComplete = isMatchComplete(match);

      return { ...match, isWorldCup, isComplete };
    }
    default: {
      return match;
    }
  }
}
