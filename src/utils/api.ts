
import axios from 'axios';
import { formatApiDate, addDays, getPreviousMonday } from '@utils/date';
import { parseMatches } from '@utils/parsers';
import { RANKINGS, FIXTURES, TEAMS } from '@constants/urls';
import type { Team, Entry, Match } from '@types';


const DELAY_API_REQUESTS = false;

const TODAY = new Date();

const sleep = (millis: number) => new Promise(resolve => setTimeout(resolve, millis));

async function axiosGet(url: string, params = {}) {
  try {
    if (DELAY_API_REQUESTS) await sleep(1000);
    const { data } = await axios.get(url, { params });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function fetchCountries(teamIds: string[]) {
  const requests = teamIds.map(id => axiosGet(`${TEAMS}/${id}`));
  const teams = await axios.all(requests);

  return teams.reduce((memo, team) => ({ ...memo, [team.id]: team.country }), {});
}

export function fetchRankings(sport: string, date: Date) {
  return axiosGet(`${RANKINGS}/${sport}`, {
    date: formatApiDate(date),
  });
}

async function fetchMatches(sport: string, startDate: Date, endDate: Date, rankings: Entry[]) {
  const rankedTeamIds = rankings.map(entry => entry.team.id);

  const response = await axiosGet(FIXTURES, {
    startDate: formatApiDate(startDate),
    endDate: formatApiDate(endDate),
    sort: 'asc',
    pageSize: 100,
    page: 0,
    sport,
  });

  // Filter out matches with null teams or that feature teams that are not in the rankings.
  const matches = response.content.filter((match: Match) => {
    const isTeamsConfirmed = match.teams.every((team: Team) => Boolean(team));
    const isTeamsRanked = match.teams.every((team: Team) => rankedTeamIds.includes(team.id));
    const isMatchRanked = Boolean(match.competition);

    return isTeamsConfirmed && isTeamsRanked && isMatchRanked;
  });

  // For each match I need to fetch the country for each participating team.
  // The name of the country can be different from the name of team.
  // I need the name of the country later to compare with the venue to to determine home advantage.
  return Promise.all(matches.map(async (match: Match) => {
    const matchTeamIds = match.teams.map(team => team.id);
    const countries = await fetchCountries(matchTeamIds);

    return {
      ...match,
      teams: match.teams.map(team => ({ ...team, country: countries[team.id] })),
    };
  }));
}

export async function fetchData(sport: string, date = TODAY) {
  try {
    const startDate = getPreviousMonday(date);

    const { entries: rankings, label } = await fetchRankings(sport, startDate);

    const endDate = addDays(startDate, 6);

    const matches = await fetchMatches(sport, startDate, endDate, rankings);

    // Make a map of teams participating in matches grouped by team id to be used below.
    const matchTeamsById = matches.reduce(
      (matchMemo: object, match: Match) =>
        match.teams.reduce(
          (teamMemo: object, team: Team) => ({ ...teamMemo, [team.id]: team }),
          matchMemo,
        ),
      {},
    );

    // Create a list of teams from the fetched rankings,
    // with the the teams participating in matches injected,
    // since they have the country attribute missing from the teams fetched from the rankings.
    const teams = rankings.map((entry: Entry) => matchTeamsById[entry.team.id] ?? entry.team, []);

    return {
      sport,
      label,
      teams,
      rankings,
      matches: parseMatches(matches),
      startDate,
      endDate,
    };

  } catch (error) {
    return Promise.reject(error);
  }
}

