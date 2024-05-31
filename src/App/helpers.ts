import type { Entry, ParsedMatch } from '@types';

function calculatePointsChanges(rankings: Entry[], match: ParsedMatch) : Entry[] {
  let ratingGap;
  let ratingChange;

  const { homeTeam, awayTeam, homeScore, awayScore, isNeutralVenue, isWorldCup } = match;

  const homeEntry = rankings.find(entry => entry.team.id === homeTeam.id);
  const awayEntry = rankings.find(entry => entry.team.id === awayTeam.id);

  if (!homeEntry) throw Error('Home team must be defined');
  if (!awayEntry) throw Error('Away team must be defined');

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
    ratingChange = 1 - (0.1 * ratingGap);
  } else if (homeScore < awayScore) {
    ratingChange = 1 + (0.1 * ratingGap);
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
    const updatedHomeEntry = { ...homeEntry, pts: homeEntry.pts + ratingChange };
    const updatedAwayEntry = { ...awayEntry, pts: awayEntry.pts - ratingChange };

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
}

export function calculateRankingChange(rankings: Entry[], matches: ParsedMatch[]) {
  return matches
    .reduce((memo: Entry[], match: ParsedMatch) : Entry[] => {
      if (match.isComplete) {
        return calculatePointsChanges(memo, match);
      }
      return memo;
    }, rankings)
    .sort((entryA, entryB) => {
      return entryB.pts - entryA.pts;
    })
    .map((entry, i) => ({ ...entry, pos: i + 1 }));
}
