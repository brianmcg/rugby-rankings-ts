import { I18nextProvider } from 'react-i18next';
import { CssBaseline } from '@mui/material/';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import i18n from '@utils/i18n';
import theme from '@utils/theme';
import { ACTIONS } from './actions';
import { useFetchData } from './hooks';
import Header from './components/Header';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Main from './components/Main';
import Footer from './components/Footer';
import MatchModal from './components/MatchModal';
import type { Sport, AppMatch } from '@constants/types';

export default function App() {
  const [state, dispatch] = useFetchData();

  const { data, fetchedData, selectedMatch, sport, isLoading, isError } = state;

  const {
    label,
    startDate,
    endDate,
    teams = [],
    rankings = [],
    matches = [],
  } = data ?? {};

  const changeSport = (newSport: Sport) =>
    dispatch({
      type: ACTIONS.CHANGE_SPORT,
      payload: { sport: newSport },
    });

  const createMatch = () =>
    dispatch({
      type: ACTIONS.CREATE_MATCH,
    });

  const unselectMatch = () =>
    dispatch({
      type: ACTIONS.UNSELECT_MATCH,
    });

  const selectMatch = (match: AppMatch) =>
    dispatch({
      type: ACTIONS.SELECT_MATCH,
      payload: { match },
    });

  const addMatch = (match: AppMatch) =>
    dispatch({
      type: ACTIONS.ADD_MATCH,
      payload: { match },
    });

  const updateMatch = (match: AppMatch) =>
    dispatch({
      type: ACTIONS.UPDATE_MATCH,
      payload: { match },
    });

  const removeMatch = (matchId: string) =>
    dispatch({
      type: ACTIONS.REMOVE_MATCH,
      payload: { matchId },
    });

  const updateMatches = (matches: Array<AppMatch>) =>
    dispatch({
      type: ACTIONS.UPDATE_MATCHES,
      payload: { matches },
    });

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header sport={sport} disabled={isLoading} changeSport={changeSport} />
        <Stack sx={{ minHeight: '100vh' }} justifyContent="space-between">
          <ResponsiveAppBar
            startDate={startDate}
            disabled={isLoading || isError}
            onCreateMatch={createMatch}
            onResetMatches={() =>
              updateMatches(fetchedData[sport]?.matches ?? [])
            }
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
          unselectMatch={unselectMatch}
          addMatch={addMatch}
          updateMatch={updateMatch}
        />
      </ThemeProvider>
    </I18nextProvider>
  );
}
