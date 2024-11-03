import type { AppMatch, Sport, Data } from '@constants/types';

type MatchPayload = { match: AppMatch };

type MatchIdPayload = { matchId: string };

type MatchesPayload = { matches: Array<AppMatch> };

type SportPayload = { sport: Sport };

type DataPayload = { data: Data };

type Payload =
  | DataPayload
  | SportPayload
  | MatchPayload
  | MatchIdPayload
  | MatchesPayload;

type Action = {
  type: string;
  payload?: Payload;
};

export type {
  DataPayload,
  Action,
  SportPayload,
  MatchPayload,
  MatchIdPayload,
  MatchesPayload,
};
