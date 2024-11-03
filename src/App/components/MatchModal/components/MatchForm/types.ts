import type { Team } from '@constants/types';

type TeamPayload = { team: Team | null };

type ScorePayload = { score: number | null };

type SelectedPayload = { isSelected: boolean };

type Action = {
  type: string;
  payload: TeamPayload | ScorePayload | SelectedPayload;
};

export type { Action, TeamPayload, ScorePayload, SelectedPayload };
