import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export default function Loading() {
  return (
    <Stack alignItems="center" justifyContent="center">
      <CircularProgress />
    </Stack>
  );
}
