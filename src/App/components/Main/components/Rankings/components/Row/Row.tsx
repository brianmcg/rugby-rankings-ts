import { TableRow, TableCell, Typography } from '@mui/material';
import RankCell from './components/RankCell';
import PointsCell from './components/PointsCell';
import type { Entry } from '@constants/types';

export default function Row({
	pos,
	previousPos,
	pts,
	previousPts,
	team,
}: Entry) {
	return (
		<TableRow
			key={team.id}
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<RankCell pos={pos} previousPos={previousPos} />
			<TableCell sx={{ color: 'secondary.main' }}>
				<Typography variant="body2" sx={{ fontSize: 16 }}>
					{team.name}
				</Typography>
			</TableCell>
			<PointsCell pts={pts} previousPts={previousPts} />
		</TableRow>
	);
}
