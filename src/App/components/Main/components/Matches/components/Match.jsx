import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Translate from '@components/Translate';
import Breadcrumb from '@components/Breadcrumb';
import { formatDayMonth } from '@utils/date';

function getColor(match, palette) {
  const { isCreated, isUpdated, isComplete } = match;
  const { success, primary, error } = palette;

  if (isCreated || isUpdated) {
    return success.main;
  } else if (isComplete) {
    return primary.main;
  } else {
    return error.main;
  }
}

function renderMatchInfo(match) {
  const { time, venue,competition } = match;
  const date = time ? formatDayMonth(time?.millis) : null;
  const country = venue?.country ? `@ ${venue.country}` : null;

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="flex-start"
      sx={{ color: 'secondary.main', opacity: 0.6, display: { xs: 'none', md: 'flex' } }}
    >
      <Breadcrumb>
        { competition ? <Typography variant="caption" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{competition}</Typography> : null }
        { date ? <Typography variant="caption">{date}</Typography> : null }
        { country ? <Typography variant="caption">{country}</Typography> : null }
      </Breadcrumb>
    </Stack>
  );
}

function renderMatchResult({ match, color }) {
  const { homeTeam, awayTeam, homeScore, awayScore, isComplete } = match;
  return (
    <Stack sx={{ color: 'secondary.main' }}>
      <Grid container direction="row" gap={1} alignItems="center" justifyContent="flex-start">
        <Typography variant="body1">{homeTeam.name}</Typography>
        <Typography variant="h6" color={color}>
          {
            isComplete
              ? `${homeScore} - ${awayScore}`
              : <Translate text="app.main.matches.vs"></Translate>
          }
        </Typography>
        <Typography variant="body1">{awayTeam.name}</Typography>
      </Grid>
    </Stack>
  );
}

function renderButtons(options) {
  return(
    <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
      {options.map(({ icon, onClick, color }) => (
        <IconButton
          key={color}
          color="primary"
          sx={{ p: 0, '&:hover': { color }}}
          onClick={onClick}
          size="small"
        >
          {icon}
        </IconButton>
      ))}
    </Stack>
  );
}

export default function Match({ match, selectMatch, removeMatch }) {
  const { matchId } = match;
  const { palette } = useTheme();
  const color = getColor(match, palette);

  const options = [
    { icon: <EditIcon />, onClick: () => selectMatch(match), color: 'success.main' },
    { icon: <DeleteIcon />, onClick: () => removeMatch(matchId), color: 'error.main' },
  ];

  return (
    <Paper elevation={2} sx={{ padding: 1, width: '100%', borderLeft: `solid 5px ${color}` }} >
      {renderMatchInfo(match)}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {renderMatchResult({ match, color })}
        {renderButtons(options)}
      </Stack>
    </Paper>
  );
}
