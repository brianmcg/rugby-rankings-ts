import type { Entry, ParsedMatch } from '@constants/types';

const calculatePointsChanges = (
  rankings: Array<Entry>,
  match: ParsedMatch,
): Array<Entry> => {
  let ratingGap;
  let ratingChange;

  const {
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    isNeutralVenue,
    isWorldCup,
  } = match;

  if (homeTeam === null) {
    throw new Error('Home team is null');
  }

  if (awayTeam === null) {
    throw new Error('Away team is null');
  }

  const homeEntry = rankings.find(entry => entry.team.id === homeTeam.id);
  const awayEntry = rankings.find(entry => entry.team.id === awayTeam.id);

  if (homeEntry === undefined) {
    throw new Error("Can't find home team in rankings");
  }

  if (awayEntry === undefined) {
    throw new Error("Can't find away team in rankings");
  }

  if (homeScore === null) {
    throw new Error('Home score is null');
  }

  if (awayScore === null) {
    throw new Error('Away score is null');
  }

  if (isNeutralVenue) {
    ratingGap = homeEntry.pts - awayEntry.pts;
  } else {
    ratingGap = homeEntry.pts - awayEntry.pts + 3;
  }

  if (ratingGap > 10) {
    ratingGap = 10;
  } else if (ratingGap < -10) {
    ratingGap = -10;
  }

  if (homeScore > awayScore) {
    ratingChange = 1 - 0.1 * ratingGap;
  } else if (homeScore < awayScore) {
    ratingChange = 1 + 0.1 * ratingGap;
  } else {
    ratingChange = 0.1 * ratingGap;
  }

  if (Math.abs(homeScore - awayScore) > 15) {
    ratingChange = ratingChange * 1.5;
  }

  if (isWorldCup) {
    ratingChange = ratingChange * 2;
  }

  if (homeScore > awayScore) {
    const updatedHomeEntry = {
      ...homeEntry,
      pts: homeEntry.pts + ratingChange,
    };

    const updatedAwayEntry = {
      ...awayEntry,
      pts: awayEntry.pts - ratingChange,
    };

    return rankings.map(entry => {
      if (entry.team.id === updatedHomeEntry.team.id) {
        return updatedHomeEntry;
      }

      if (entry.team.id === updatedAwayEntry.team.id) {
        return updatedAwayEntry;
      }

      return entry;
    });
  }

  const updatedHomeEntry = { ...homeEntry, pts: homeEntry.pts - ratingChange };
  const updatedAwayEntry = { ...awayEntry, pts: awayEntry.pts + ratingChange };

  return rankings.map(entry => {
    if (entry.team.id === updatedHomeEntry.team.id) {
      return updatedHomeEntry;
    }

    if (entry.team.id === updatedAwayEntry.team.id) {
      return updatedAwayEntry;
    }

    return entry;
  });
};

export const calculateRankingChange = (
  rankings: Array<Entry>,
  matches: Array<ParsedMatch> = [],
): Array<Entry> => {
  return matches
    .reduce((memo, match) => {
      if (match.isComplete) {
        return calculatePointsChanges(memo, match);
      }
      return memo;
    }, rankings ?? [])
    .sort((entryA, entryB) => {
      return entryB.pts - entryA.pts;
    })
    .map((entry, i) => ({ ...entry, pos: i + 1 }));
};
