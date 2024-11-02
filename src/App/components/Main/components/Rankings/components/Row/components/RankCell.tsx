import { TableCell, Typography, Stack } from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

function renderContents(pos: number, previousPos: number) {
  if (pos < previousPos) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography color="secondary.main" variant="body1">
          {pos}
        </Typography>
        <ArrowUpward sx={{ color: 'success.main', fontSize: 14 }} />
        <Typography
          sx={{
            color: 'success.main',
            fontSize: 14,
            display: { xs: 'none', sm: 'block' },
          }}
          variant="body2"
        >
          ({previousPos})
        </Typography>
      </Stack>
    );
  } else if (pos > previousPos) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography color="secondary.main" variant="body1">
          {pos}
        </Typography>
        <ArrowDownward sx={{ color: 'error.main', fontSize: 14 }} />
        <Typography
          sx={{
            color: 'error.main',
            fontSize: 14,
            display: { xs: 'none', sm: 'block' },
          }}
          variant="body2"
        >
          ({previousPos})
        </Typography>
      </Stack>
    );
  } else {
    return (
      <Stack alignItems="center" direction="row">
        <Typography color="secondary.main" variant="body1">
          {pos}
        </Typography>
      </Stack>
    );
  }
}

type Props = {
  pos: number;
  previousPos: number;
};

export default function RankCell({ pos, previousPos }: Props) {
  return (
    <TableCell component="th" scope="row">
      {renderContents(pos, previousPos)}
    </TableCell>
  );
}
