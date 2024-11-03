import { ReactNode, SyntheticEvent, ChangeEventHandler } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Translate from '@components/Translate';
import TeamInput from './components/TeamInput';
import ScoreInput from './components/ScoreInput';
import type { Team } from '@constants/types';

type Props = {
  team: Team | null;
  score: number | null;
  otherTeam: Team | null;
  teams: Array<Team>;
  onTeamChange: (event: SyntheticEvent, value: Team | null) => void;
  onScoreChange: ChangeEventHandler<HTMLInputElement>;
  label: ReactNode;
};

export default function EntryInput({
  team,
  score,
  otherTeam,
  teams,
  onTeamChange,
  onScoreChange,
  label,
}: Props) {
  return (
    <Grid container alignItems="flex-start" justifyContent="space-between">
      <Grid item xs={12} sm={9}>
        <Box style={{ margin: 8 }}>
          <TeamInput
            options={teams.filter(team => team.id !== otherTeam?.id)}
            value={team}
            onChange={onTeamChange}
            label={label}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Box style={{ margin: 8 }}>
          <ScoreInput
            value={score}
            label={<Translate text="app.main.modal.score" />}
            onChange={onScoreChange}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
