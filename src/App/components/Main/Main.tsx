import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ErrorMessage from '@components/ErrorMessage';
import Loading from '@components/Loading';
import Rankings from './components/Rankings';
import Matches from './components/Matches';
import type { ParsedMatch, Entry, Team, Sport } from '@constants/types';

type Props = {
  matches: Array<ParsedMatch>;
  rankings: Array<Entry>;
  label: string;
  teams: Array<Team>;
  sport: Sport;
  startDate: Date;
  endDate: Date;
  isError: boolean;
  isLoading: boolean;
  selectMatch: (match: ParsedMatch) => void;
  removeMatch: (matchId: string) => void;
};

export default function Main({
  matches,
  rankings,
  label,
  sport,
  startDate,
  endDate,
  isError,
  isLoading,
  selectMatch,
  removeMatch,
}: Props) {
  if (isError) return <ErrorMessage message="app.errors.fetch" />;

  if (isLoading) return <Loading />;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4} direction="row-reverse">
        <Grid item xs={12} md={6}>
          <Matches
            matches={matches}
            sport={sport}
            startDate={startDate}
            endDate={endDate}
            selectMatch={selectMatch}
            removeMatch={removeMatch}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Rankings label={label} rankings={rankings} sport={sport} />
        </Grid>
      </Grid>
    </Container>
  );
}
