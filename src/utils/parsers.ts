import { WORLD_CUP } from '@constants/regex';
import { MATCH_STATUSES, COUNTRIES } from '@constants/data';
import type { Venue, Team, Match } from '@types';

// The Irish team represents both Ireland and Northern Ireland, so if the venue country
// is Northern Ireland we still want it to count as home advantage.
function getVenueCountry(venue: Venue) {
  return venue?.country === COUNTRIES.NORTHERN_IRELAND ? COUNTRIES.IRELAND : venue?.country;
}

// Ukraine don't play home games in Ukraine, but home advantage still applies.
function respectHomeAdvantage(teams: Team[]) {
  return teams.some(team => team.name === COUNTRIES.UKRAINE);
}

function isRWC(competition: string) {
  return WORLD_CUP.test(competition);
}

function parseMatch(match: Match) {
  const { matchId, teams, scores, status, venue, time, competition } = match;
  const venueCountry = getVenueCountry(venue);
  const indexOfVenueTeam = respectHomeAdvantage(teams)
    ? 0
    : (venue ? teams.map(t => t.country).indexOf(venueCountry) : 0);

  const isNeutralVenue = indexOfVenueTeam < 0;
  const homeIndex = indexOfVenueTeam < 0 ? 0 : indexOfVenueTeam;
  const awayIndex = indexOfVenueTeam === 1 ? 0 : 1;

  const homeTeam = teams[homeIndex];
  const awayTeam = teams[awayIndex];
  const isComplete = status === MATCH_STATUSES.COMPLETE;
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
}

export function parseMatches(matches: Match[]) {
  return matches.map(match => parseMatch(match));
}
