import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { formatRange } from '@utils/date';
import Translate from '@components/Translate';
import { SPORTS } from '@constants/enums';
import Match from './components/Match';
import type { AppMatch, Sport } from '@constants/types';

import mruImageSrc from '@assets/images/mru/matches.png';
import wruImageSrc from '@assets/images/wru/matches.png';

const IMAGES = {
  [SPORTS.MENS]: mruImageSrc,
  [SPORTS.WOMENS]: wruImageSrc,
};

type Props = {
  matches: Array<AppMatch>;
  sport: Sport;
  startDate: Date;
  endDate: Date;
  selectMatch: (match: AppMatch) => void;
  removeMatch: (matchId: string) => void;
};

export default function Matches({
  matches,
  sport,
  startDate,
  endDate,
  selectMatch,
  removeMatch,
}: Props) {
  return (
    <Card>
      <CardMedia image={IMAGES[sport]} sx={{ p: 1, color: 'common.white' }}>
        <Stack
          sx={{ height: '100%', p: 2 }}
          spacing={2}
          direction="row"
          alignItems="flex-end"
          justifyContent="flex-start"
        >
          <Typography variant="h5">
            <Translate
              text="app.main.matches.title"
              options={{ range: formatRange(startDate, endDate) }}
            />
          </Typography>
        </Stack>
      </CardMedia>
      <CardContent>
        {matches.length ? (
          <Box>
            <List sx={{ p: 0 }}>
              {matches.map(match => (
                <ListItem sx={{ p: 1 }} key={match.matchId}>
                  <Match
                    match={match}
                    selectMatch={selectMatch}
                    removeMatch={removeMatch}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <Typography color="secondary.main" variant="body2">
            <Translate text="app.main.matches.empty" />
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
