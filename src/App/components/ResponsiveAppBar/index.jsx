import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Translate from '@components/Translate';
import useMediaQuery from '@mui/material/useMediaQuery';
import { formatDay } from '@utils/date';
import NavMenu from './components/NavMenu';
import DropdownNavMenu from './components/DropdownNavMenu';

export default function ResponsiveAppBar({
  startDate,
  disabled,
  onSelectMatch,
  onResetMatches,
  onClearMatches,
}) {
  const options = [
    { label: 'app.main.reset', icon: <RefreshIcon />, onClick: onResetMatches },
    { label: 'app.main.clear', icon: <DeleteIcon />, onClick: onClearMatches },
    { label: 'app.main.add', icon: <AddIcon />, onClick: onSelectMatch },
  ];

  const matchesSmallBreakpoint = useMediaQuery('(min-width:600px)');

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'secondary.main' }}>
      <Container>
        <Toolbar disableGutters>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ opacity: disabled ? 0 : 1 }}>
            <Typography variant="subtitle2" sx={{ textTransform: 'uppercase' }}>
              <Translate text="app.main.updated" />
            </Typography>
            <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', fontWeight: 900 }}>
              {startDate ? formatDay(startDate) : null}
            </Typography>
          </Stack>
          {
            matchesSmallBreakpoint
              ? <NavMenu options={options} disabled={disabled} />
              : <DropdownNavMenu options={options} />
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
