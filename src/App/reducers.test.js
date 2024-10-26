import { rankingsReducer } from './reducers';
import { ACTIONS } from './actions';
import { formatPoints } from '@utils/number';
import { SPORTS } from '@constants/data';
import data from './mock-data/data';
import rankings from './mock-data/rankings';

describe('rankingsReducer', async () => {
  const initialState = {
    data: null,
    initialData: null,
    isError: null,
    isLoading: true,
    selectedMatch: null,
    sport: SPORTS.VALUES.MENS,
  };

  it('should produce state of next weeks rankings', () => {
    const state = rankingsReducer(initialState, {
      type: ACTIONS.FETCH_SUCCESS,
      payload: { data },
    });

    state.data.rankings.forEach((entry) => {
      const nextEntry = rankings.entries.find(r => r.team.id === entry.team.id);
      const currentPoints = formatPoints(entry.pts);
      const nextPoints = formatPoints(nextEntry.pts);

      expect(`${entry.team.name}: ${currentPoints}`).toBe(`${nextEntry.team.name}: ${nextPoints}`);
    });
  });

});
