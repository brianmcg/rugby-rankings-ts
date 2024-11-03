import { Palette } from '@mui/material';
import type { ParsedMatch } from '@constants/types';

export const getColor = (match: ParsedMatch, palette: Palette) => {
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
