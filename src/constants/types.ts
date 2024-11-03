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
  sport: Sport;
  start: Time;
  end: Time;
  abbr: string | null;
  winningTeam: string | null;
  eventStatus: EventStatus;
  seriesId: string | null;
  seriesAltId: string | null;
  rankingsWeight: number;
  impactPlayers: string | null;
  teamPerformances: string | null;
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
  gmtOffset?: number;
  label?: Date;
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
  annotations?: string | null;
  country?: string;
  countryCode?: string;
  name?: string;
  naming?: Array<Naming>;
  sport?: Sport;
  type?: string;
};

export type Venue = {
  id?: string;
  altId?: string;
  name?: string;
  city?: string;
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
  description: string | null;
  eventPhase: string | null;
  eventPhaseId: EventPhaseID | null;
  venue: Venue | null;
  time: Time;
  attendance: string | null;
  teams: Array<Team>;
  scores: Array<number>;
  kc: string | null;
  status: string;
  clock: Clock;
  outcome: string;
  events: Array<Event>;
  sport: Sport;
  competition: string;
  weather: string | null;
  rankingsWeight: string | null;
};

export type Matches = {
  pageInfo: PageInfo;
  content: Array<Match>;
};

export type ParsedMatch = {
  matchId: string | null;
  homeTeam: Team | null;
  awayTeam: Team | null;
  homeScore: number | null;
  awayScore: number | null;
  venue: Venue | null;
  time: Time | null;
  competition: string | null;
  isNeutralVenue: boolean;
  isWorldCup: boolean;
  isComplete: boolean;
  isCreated?: boolean;
  isUpdated?: boolean;
};

export type Data = {
  sport: Sport;
  label: string;
  teams: Array<Team>;
  rankings: Array<Entry>;
  matches: Array<ParsedMatch>;
  startDate: Date;
  endDate: Date;
};

export type Sport = 'mru' | 'wru';

type InitialData = {
  mru?: Data;
  wru?: Data;
};

export type InitialState = {
  data: null;
  initialData: null;
  isError: boolean;
  isLoading: boolean;
  selectedMatch: null;
  sport: Sport;
};

export type State = {
  data: Data | null;
  initialData: InitialData | null;
  isError: boolean;
  isLoading: boolean;
  selectedMatch: ParsedMatch | null;
  sport: Sport;
};
