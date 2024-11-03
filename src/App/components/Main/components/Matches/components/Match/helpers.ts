import { Palette } from '@mui/material';
import type { AppMatch } from '@constants/types';

export const getColor = (match: AppMatch, palette: Palette) => {
	const { isCreated, isUpdated, isComplete } = match;
	const { success, primary, error } = palette;

	if (isCreated || isUpdated) {
		return success.main;
	} else if (isComplete) {
		return primary.main;
	} else {
		return error.main;
	}
};
