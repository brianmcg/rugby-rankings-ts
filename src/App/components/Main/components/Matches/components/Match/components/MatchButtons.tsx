import { ReactNode } from 'react';
import { Stack, IconButton } from '@mui/material';

type Option = {
	icon: ReactNode;
	onClick: () => void;
	color: string;
};

type Props = {
	options: Array<Option>;
};

export default function MatchButtons({ options }: Props) {
	return (
		<Stack
			spacing={2}
			direction="row"
			alignItems="center"
			justifyContent="flex-end"
		>
			{options.map(({ icon, onClick, color }) => (
				<IconButton
					key={color}
					color="primary"
					sx={{ p: 0, '&:hover': { color } }}
					onClick={onClick}
					size="small"
				>
					{icon}
				</IconButton>
			))}
		</Stack>
	);
}
