import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import Translate from '@components/Translate';
import MatchForm from './components/MatchForm';
import type { ParsedMatch, Team } from '@constants/types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  minWidth: { xs: 300, sm: 600 },
  p: 2,
};

type Props = {
  match: ParsedMatch;
  teams: Array<Team>;
  endDate: Date;
  unselectMatch: () => void;
  addMatch: (match: ParsedMatch) => void;
  updateMatch: (match: ParsedMatch) => void;
};

export default function MatchModal({
  match,
  teams,
  endDate,
  unselectMatch,
  addMatch,
  updateMatch,
}: Props) {
  const isOpen = Boolean(match);

  const onClose = () => unselectMatch();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            color="secondary.main"
            sx={{ p: 1 }}
          >
            <Typography variant="h6">
              <Translate text="app.main.modal.title" />
            </Typography>

            <IconButton
              color="primary"
              sx={{ p: 0, '&:hover': { color: 'error.main' } }}
              onClick={onClose}
              size="small"
            >
              <CancelIcon />
            </IconButton>
          </Stack>

          <MatchForm
            match={match}
            teams={teams}
            endDate={endDate}
            addMatch={addMatch}
            updateMatch={updateMatch}
          />
        </Box>
      </Fade>
    </Modal>
  );
}
