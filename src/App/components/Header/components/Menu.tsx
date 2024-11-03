import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Translate from '@components/Translate';
import { formatDay } from '@utils/date';

type Props = {
  startDate: Date;
  disabled: boolean;
  onResetMatches: () => void;
  onClearMatches: () => void;
  onSelectMatch: () => void;
};

export default function Menu({
  startDate,
  disabled,
  onResetMatches,
  onClearMatches,
  onSelectMatch,
}: Props) {
  const options = [
    { label: 'app.main.reset', icon: <RefreshIcon />, action: onResetMatches },
    { label: 'app.main.clear', icon: <DeleteIcon />, action: onClearMatches },
    { label: 'app.main.add', icon: <AddIcon />, action: () => onSelectMatch() },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        p: 3,
        bgcolor: 'secondary.main',
        color: 'common.white',
      }}
    >
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ opacity: disabled ? 0 : 1 }}
          >
            <Typography variant="subtitle2" sx={{ textTransform: 'uppercase' }}>
              <Translate text="app.main.updated" />
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ textTransform: 'uppercase', fontWeight: 900 }}
            >
              {startDate ? formatDay(startDate) : null}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={4}
            alignItems="center"
            justifyContent="flex-end"
          >
            {options.map(({ icon, action, label }) => (
              <Button
                key={label}
                disabled={disabled}
                sx={{
                  p: 0,
                  opacity: 0.6,
                  '&:hover': { opacity: 1 },
                  '&:disabled': { opacity: 0 },
                }}
                color="inherit"
                startIcon={icon}
                onClick={action}
              >
                <Translate text={label} />
              </Button>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
