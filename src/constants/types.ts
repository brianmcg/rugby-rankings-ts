type Clock = {
  secs: number;
  label: string;
};

type EventPhaseID = {
  type: string;
  subType: string;
};

type Event = {
  id: string;
  altId: string;
  label: string;
  sport: string;
  start: Time;
  end: Time;
  abbr: null;
  winningTeam: null;
  eventStatus: EventStatus;
  seriesId: null;
  seriesAltId: null;
  rankingsWeight: number;
  impactPlayers: null;
  teamPerformances: null;
};

type EventStatus = {
  eventStatusID: number;
  eventStatusName: string;
};

export type Naming = {
  from: Time | null;
  until: Time | null;
  name: string;
  abbr: string;
};

type Time = {
  millis: number;
  gmtOffset: number;
  label: Date;
};

type PageInfo = {
  page: number;
  numPages: number;
  pageSize: number;
  numEntries: number;
};

export type Team = {
  id: string;
  altId: string;
  abbreviation?: string;
  annotations?: null;
  country?: string;
  countryCode?: string;
  name?: string;
  naming?: Array<Naming>;
  sport?: null;
  type?: string;
};

export type Venue = {
  id: string;
  altId: string;
  name: string;
  city: string;
  country: string;
};

export type Entry = {
  team: Team;
  pts: number;
  pos: number;
  previousPts: number;
  previousPos: number;
};

export type Rankings = {
  label: string;
  entries: Array<Entry>;
  effective: Time;
};

export type Match = {
  matchId: string;
  matchAltId: string;
  description: null;
  eventPhase: null | string;
  eventPhaseId: EventPhaseID | null;
  venue: Venue | null;
  time: Time;
  attendance: null;
  teams: Array<Team>;
  scores: Array<number>;
  kc: null;
  status: string;
  clock: Clock;
  outcome: string;
  events: Array<Event>;
  sport: string;
  competition: string;
  weather: null;
  rankingsWeight: null;
};

export type Matches = {
  pageInfo: PageInfo;
  content: Array<Match>;
};

export type ParsedMatch = {
  matchId: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  venue: Venue | null;
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
  startDate: Date;
  endDate: Date;
};
