export const validateScore = (value: number)  => value !== null && value !== 1 && value !== 2 && value !== 4 && value > -1;

export const validateTeam = (value: string) => value !== null;
