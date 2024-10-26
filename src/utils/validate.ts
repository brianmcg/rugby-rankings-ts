export const validateScore = (value: number): boolean  => value !== null && value !== 1 && value !== 2 && value !== 4 && value > -1;

export const validateTeam = (value: string): boolean => value !== null;
