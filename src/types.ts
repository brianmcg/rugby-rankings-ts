export type Venue = {
  city: string;
  country: string;
  id: string;
  name: string;
};

export type Time = {
  gmtOffset: number;
  label: string;
  millis: number;
}

export type Team = {
  id: string;
  name: string;
  abbreviation: string;
  countryCode: string;
  country: string;
};

export type Entry = {
  pos: number;
  previousPos: number;
  previousPts: number;
  pts: number;
  team: Team;
};

export type Match = {
  competition: string;
  matchId: string;
  outcome: string;
  rankingsWeight: number;
  scores: Array<number>;
  sport: string;
  status: string;
  teams: Array<Team>;
  time: Time;
  venue: Venue;
};

export type ParsedMatch = {
  matchId: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  venue: Venue;
  time: Time;
  competition: string;
  isNeutralVenue: boolean;
  isWorldCup: boolean;
  isComplete: boolean;
};

export type Data = {
  sport: string;
  label: string;
  teams: Array<Team>;
  rankings: Array<Entry>;
  matches: Array<ParsedMatch>;
  startDate: string;
  endDate: string;
};

export type State = {
  data: Data;
  initialData: { mru: Data, wru: Data };
  isError: boolean;
  isLoading: boolean;
  selectedMatch: ParsedMatch | null;
  sport: string;
};


