import { WORLD_CUP } from '@utils/regex';
import { MatchStatusEnum, CountryEnum } from '@constants/enums';

import type { Venue, Team, Match, AppMatch } from '@constants/types';

// The Irish team represents both Ireland and Northern Ireland, so if the venue country
// is Northern Ireland we still want it to count as home advantage.
const getVenueCountryEnum = (venue: Venue | null): string =>
  venue?.country === CountryEnum.NORTHERN_IRELAND
    ? CountryEnum.IRELAND
    : (venue?.country ?? '');

// Ukraine don't play home games in Ukraine, but home advantage still applies.
const respectHomeAdvantage = (teams: Array<Team>): boolean =>
  teams.some(team => team.name === CountryEnum.UKRAINE);

const isRWC = (competition: string): boolean => WORLD_CUP.test(competition);

const parseMatch = ({
  matchId,
  teams,
  scores,
  status,
  venue,
  time,
  competition,
}: Match): AppMatch => {
  const venueCountryEnum = getVenueCountryEnum(venue);
  const indexOfVenueTeam = respectHomeAdvantage(teams)
    ? 0
    : venue
      ? teams.map(t => t.country).indexOf(venueCountryEnum)
      : 0;

  const isNeutralVenue = indexOfVenueTeam < 0;
  const homeIndex = indexOfVenueTeam < 0 ? 0 : indexOfVenueTeam;
  const awayIndex = indexOfVenueTeam === 1 ? 0 : 1;

  const homeTeam = teams[homeIndex];
  const awayTeam = teams[awayIndex];
  const isComplete = status === (MatchStatusEnum.COMPLETE as string);
  const homeScore = isComplete ? scores[homeIndex] : null;
  const awayScore = isComplete ? scores[awayIndex] : null;
  const isWorldCup = isRWC(competition);

  return {
    matchId,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    venue,
    time,
    competition,
    isNeutralVenue,
    isWorldCup,
    isComplete,
  };
};

export const parseMatches = (matches: Array<Match>): Array<AppMatch> =>
  matches.map(match => parseMatch(match));
