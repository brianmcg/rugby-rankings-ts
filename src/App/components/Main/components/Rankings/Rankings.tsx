import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Translate from '@components/Translate';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { SportEnum } from '@constants/enums';
import Row from './components/Row';
import type { Sport, Entry } from '@constants/types';

import mruImageSrc from '@assets/images/mru/rankings.png';
import wruImageSrc from '@assets/images/wru/rankings.png';

const INITIAL_ROWS = 16;

const IMAGES = {
  [SportEnum.MENS]: mruImageSrc,
  [SportEnum.WOMENS]: wruImageSrc,
};

type Props = {
  rankings: Array<Entry>;
  label: string;
  sport: Sport;
};

export default function Rankings({ rankings, label, sport }: Props) {
  const [fullTable, setFullTable] = useState(false);
  const entries = fullTable ? rankings : rankings.slice(0, INITIAL_ROWS);

  return (
    <Card>
      <CardMedia image={IMAGES[sport]} sx={{ p: 1, color: 'common.white' }}>
        <Stack
          sx={{ height: '100%' }}
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <CardHeader
            title={
              <Translate text="app.main.rankings.title" options={{ label }} />
            }
          />
        </Stack>
      </CardMedia>
      <CardContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: 'common.white' }}>
                  <Translate text="app.main.rankings.table.rank" />
                </TableCell>
                <TableCell sx={{ bgcolor: 'common.white' }}>
                  <Translate text="app.main.rankings.table.team" />
                </TableCell>
                <TableCell sx={{ bgcolor: 'common.white' }}>
                  <Translate text="app.main.rankings.table.points" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map(({ team, ...other }) => (
                <Row key={team.id} team={team} {...other} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" p={2} mt={2}>
          <Button
            variant="contained"
            startIcon={
              fullTable ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
            }
            onClick={() => setFullTable(!fullTable)}
          >
            <Translate
              text={`app.main.rankings.${fullTable ? 'collapse' : 'expand'}`}
            />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
