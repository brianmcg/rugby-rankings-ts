import { SportEnum } from './enums';

type Sport = SportEnum.MENS | SportEnum.WOMENS;

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

type Time = {
  millis: number;
  gmtOffset?: number;
  label?: Date;
};

type Naming = {
  from: Time | null;
  until: Time | null;
  name: string;
  abbr: string;
};

type PageInfo = {
  page: number;
  numPages: number;
  pageSize: number;
  numEntries: number;
};

type Team = {
  id: string;
  altId: string;
  abbreviation?: string;
  annotations?: string | null;
  country?: string;
  countryCode?: string;
  name?: string;
  naming?: Array<Naming>;
  sport?: Sport | null;
  type?: string;
};

type Venue = {
  id?: string;
  altId?: string;
  name?: string;
  city?: string;
  country: string;
};

type Entry = {
  team: Team;
  pts: number;
  pos: number;
  previousPts: number;
  previousPos: number;
};

type Rankings = {
  label: string;
  entries: Array<Entry>;
  effective: Time;
};

type Match = {
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
  rankingsWeight: number | null;
};

type Matches = {
  pageInfo: PageInfo;
  content: Array<Match>;
};

type AppMatch = {
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

type Data = {
  sport: Sport;
  label: string;
  teams: Array<Team>;
  rankings: Array<Entry>;
  matches: Array<AppMatch>;
  startDate: Date;
  endDate: Date;
};

type InitialData = {
  mru?: Data;
  wru?: Data;
};

type State = {
  data: Data | null;
  initialData: InitialData | null;
  isError: boolean;
  isLoading: boolean;
  selectedMatch: AppMatch | null;
  sport: Sport;
};

export type {
  Data,
  Entry,
  Match,
  Matches,
  AppMatch,
  Rankings,
  Sport,
  State,
  Team,
  Venue,
};
