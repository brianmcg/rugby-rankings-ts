import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { formatPoints } from '@utils/number';


function renderContents(pts, previousPts) {
  if (pts > previousPts) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography color="secondary.main" variant="body1">{formatPoints(pts)}</Typography>
        <ArrowUpwardIcon sx={{ fontSize: 14, color: 'success.main' }} />
        <Typography
          sx={{ fontSize: 14, color: 'success.main', display: { xs: 'none', sm: 'block' } }}
          variant="body2"
        >
          ({formatPoints(previousPts)})
        </Typography
        >
      </Stack>
    );
  } else if (pts < previousPts) {
    return (
      <Stack alignItems="center" direction="row" gap={1}>
        <Typography color="secondary.main" variant="body1">{formatPoints(pts) }</Typography>
        <ArrowDownwardIcon sx={{ fontSize: 14, color: 'error.main' }} />

        <Typography
          sx={{ fontSize: 14, color: 'error.main', display: { xs: 'none', sm: 'block' } }}
          variant="body2"
        >
          ({formatPoints(previousPts)})
        </Typography
        >
      </Stack>
    );
  } else {
    return (
      <Stack alignItems="center" direction="row">
        <Typography color="secondary.main" variant="body1">{formatPoints(pts)}</Typography>
      </Stack>
    );
  }
}

export default function PointsCell({ pts, previousPts }) {
  return (
    <TableCell component="th" scope="row">
      {renderContents(pts, previousPts)}
    </TableCell>
  );
}
