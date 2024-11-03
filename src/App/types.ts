import type { ParsedMatch, Sport, Data } from '@constants/types';

type MatchPayload = { match: ParsedMatch };

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
