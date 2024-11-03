import type { AppMatch } from '@constants/types';

export const TODAY = new Date();

export const NEW_MATCH = {
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
} as AppMatch;
