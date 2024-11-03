import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MatchInfo from './components/MatchInfo';
import MatchResult from './components/MatchResult';
import MatchButtons from './components/MatchButtons';
import { getColor } from './helpers';
import type { ParsedMatch } from '@constants/types';

type Props = {
  match: ParsedMatch;
  selectMatch: (match: ParsedMatch) => void;
  removeMatch: (matchId: string) => void;
};

export default function Match({ match, selectMatch, removeMatch }: Props) {
  const { matchId } = match;
  const { palette } = useTheme();
  const color = getColor(match, palette);

  const options = [
    {
      icon: <EditIcon />,
      onClick: () => selectMatch(match),
      color: 'success.main',
    },
    {
      icon: <DeleteIcon />,
      onClick: () => removeMatch(matchId!),
      color: 'error.main',
    },
  ];

  return (
    <Paper
      elevation={2}
      sx={{ padding: 1, width: '100%', borderLeft: `solid 5px ${color}` }}
    >
      <MatchInfo match={match} />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <MatchResult match={match} color={color} />
        <MatchButtons options={options} />
      </Stack>
    </Paper>
  );
}
