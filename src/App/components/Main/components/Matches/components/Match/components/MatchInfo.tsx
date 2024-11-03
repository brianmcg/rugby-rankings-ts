import Breadcrumb from '@components/Breadcrumb';
import { formatDayMonth } from '@utils/date';
import { Stack, Typography } from '@mui/material';
import type { ParsedMatch } from '@constants/types';

type Props = {
  match: ParsedMatch;
};

export default function MatchInfo({ match }: Props) {
  const { time, venue, competition } = match;
  const date = time ? formatDayMonth(new Date(time.millis)) : null;
  const country = venue?.country ? `@ ${venue.country}` : null;

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="flex-start"
      sx={{
        color: 'secondary.main',
        opacity: 0.6,
        display: { xs: 'none', md: 'flex' },
      }}
    >
      <Breadcrumb>
        {competition ? (
          <Typography
            variant="caption"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {competition}
          </Typography>
        ) : null}
        {date ? <Typography variant="caption">{date}</Typography> : null}
        {country ? <Typography variant="caption">{country}</Typography> : null}
      </Breadcrumb>
    </Stack>
  );
}
