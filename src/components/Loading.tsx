import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

function Loading() {
  return (
    <Stack alignItems="center" justifyContent="center">
      <CircularProgress />
    </Stack>
  );
}

export default Loading;
