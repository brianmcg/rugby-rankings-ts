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
import Typography from '@mui/material/Typography';
import Translate from '@components/Translate';
import { SPORTS } from '@constants/data';
import RankCell from './components/RankCell';
import PointsCell from './components/PointsCell';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import mruImageSrc from '@assets/images/mru/rankings.png';
import wruImageSrc from '@assets/images/wru/rankings.png';

const INITIAL_ROWS = 16;

const IMAGES = {
  [SPORTS.VALUES.MENS]: mruImageSrc,
  [SPORTS.VALUES.WOMENS]: wruImageSrc,
};

function renderTableRows(rankings, fullTable) {
  const rows = fullTable ? rankings : rankings.slice(0, INITIAL_ROWS);

  return rows.map(({ pos, previousPos, pts, previousPts, team }) => (
    <TableRow
      key={team.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <RankCell pos={pos} previousPos={previousPos} />
      <TableCell sx={{ color: 'secondary.main' }}>
        <Typography variant="body2" sx={{ fontSize: 16 }}>{team.name}</Typography>
      </TableCell>
      <PointsCell pts={pts} previousPts={previousPts} />
    </TableRow>
  ));
}

export default function Rankings({ rankings, label, sport }) {
  const [fullTable, setFullTable] = useState(false);

  return (
    <Card>
      <CardMedia image={IMAGES[sport]} sx={{ p: 1, color: 'common.white' }}>
        <Stack sx={{ height: '100%' }} direction="row" alignItems="flex-end" justifyContent="space-between">
          <CardHeader title={<Translate text="app.main.rankings.title" options={{ label }}/>} />
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
              {renderTableRows(rankings, fullTable)}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" p={2} mt={2}>
          <Button
            variant="contained"
            startIcon={fullTable ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            onClick={() => setFullTable(!fullTable)}
          >
            <Translate text={`app.main.rankings.${fullTable ? 'collapse' : 'expand'}` } />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
