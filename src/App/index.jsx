import { I18nextProvider } from 'react-i18next';
import { CssBaseline } from '@mui/material/';
import { ThemeProvider  } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { fetchData } from '@utils/api';
import i18n from '@utils/i18n';
import theme from '@utils/theme';
import { SPORTS } from '@constants/data';
import { ACTIONS } from './actions';
import { useAsync, useUpdateCache } from './hooks';
import Header from './components/Header';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Main from './components/Main';
import Footer from './components/Footer';
import MatchModal from './components/MatchModal';
import Cache from './Cache';

const cache = new Cache({ dataKey: SPORTS.KEY });

const initialState = {
  data: null,
  initialData: null,
  isError: null,
  isLoading: true,
  selectedMatch: null,
  sport: SPORTS.VALUES.MENS,
};

export default function App() {
  const [state, dispatch] = useAsync(fetchData, initialState, cache);
  const { data, initialData, selectedMatch, sport, isLoading, isError } = state;
  const { label, startDate, endDate, teams, rankings, matches } = data ?? {};

  const changeSport = sport => dispatch({
    type: ACTIONS.CHANGE_SPORT, payload: { sport },
  });

  const selectMatch = match => dispatch({
    type: ACTIONS.SELECT_MATCH, payload: { match },
  });

  const addMatch = match => dispatch({
    type: ACTIONS.ADD_MATCH, payload: { match },
  });

  const updateMatch = match => dispatch({
    type: ACTIONS.UPDATE_MATCH, payload: { match },
  });

  const removeMatch = matchId => dispatch({
    type: ACTIONS.REMOVE_MATCH, payload: { matchId },
  });

  const updateMatches = matches => dispatch({
    type: ACTIONS.UPDATE_MATCHES, payload: { matches },
  });

  useUpdateCache(cache, data);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header
          sport={sport}
          disabled={isLoading}
          changeSport={changeSport}
        />
        <Stack sx={{ minHeight: '100vh' }} justifyContent="space-between">
          <ResponsiveAppBar
            startDate={startDate}
            disabled={isLoading || isError}
            onSelectMatch={() => selectMatch()}
            onResetMatches={() => updateMatches(initialData[sport]?.matches)}
            onClearMatches={() => updateMatches([])}
          />
          <Main
            rankings={rankings}
            label={label}
            matches={matches}
            teams={teams}
            sport={sport}
            startDate={startDate}
            endDate={endDate}
            isError={isError}
            isLoading={isLoading}
            selectMatch={selectMatch}
            removeMatch={removeMatch}
          />
          <Footer />
        </Stack>
        <MatchModal
          match={selectedMatch}
          teams={teams}
          endDate={endDate}
          selectMatch={selectMatch}
          addMatch={addMatch}
          updateMatch={updateMatch}
        />
      </ThemeProvider>
    </I18nextProvider>
  );
}
