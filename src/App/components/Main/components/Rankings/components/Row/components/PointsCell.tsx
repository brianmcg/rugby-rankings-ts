import { TableCell, Typography, Stack } from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { formatPoints } from '@utils/number';

function renderContents(pts: number, previousPts: number) {
  if (pts > previousPts) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography color="secondary.main" variant="body1">
          {formatPoints(pts)}
        </Typography>
        <ArrowUpward sx={{ fontSize: 14, color: 'success.main' }} />
        <Typography
          sx={{
            fontSize: 14,
            color: 'success.main',
            display: { xs: 'none', sm: 'block' },
          }}
          variant="body2"
        >
          ({formatPoints(previousPts)})
        </Typography>
      </Stack>
    );
  } else if (pts < previousPts) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography color="secondary.main" variant="body1">
          {formatPoints(pts)}
        </Typography>
        <ArrowDownward sx={{ fontSize: 14, color: 'error.main' }} />

        <Typography
          sx={{
            fontSize: 14,
            color: 'error.main',
            display: { xs: 'none', sm: 'block' },
          }}
          variant="body2"
        >
          ({formatPoints(previousPts)})
        </Typography>
      </Stack>
    );
  } else {
    return (
      <Stack alignItems="center" direction="row">
        <Typography color="secondary.main" variant="body1">
          {formatPoints(pts)}
        </Typography>
      </Stack>
    );
  }
}

type Props = {
  pts: number;
  previousPts: number;
};

export default function PointsCell({ pts, previousPts }: Props) {
  return (
    <TableCell component="th" scope="row">
      {renderContents(pts, previousPts)}
    </TableCell>
  );
}
