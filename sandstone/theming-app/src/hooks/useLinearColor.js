import {useMemo, useState} from 'react';

import {generateColorObject, generateColors} from './utils';

export const useLinearColor = (color) => {
	const [linearColor, setLinearColor] = useState(color);
	const colors = useMemo(() => {
		return generateColorObject(generateColors(color));
	}, [color]);
	const setNewColor = (index) => {
		setLinearColor(colors[index]);
	};
	return [linearColor, setNewColor];
};
