import type { Team } from '@constants/types';

export const validateScore = (value: number | null): boolean =>
	value !== null && value !== 1 && value !== 2 && value !== 4 && value > -1;

export const validateTeam = (value: Team | null): boolean => value !== null;
