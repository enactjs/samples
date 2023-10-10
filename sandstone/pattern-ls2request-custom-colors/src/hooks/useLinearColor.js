import {useMemo, useState} from 'react';

import {generateColorObject, generateColors} from './utils';

// This hook manages a dynamic color
export const useLinearColor = (color) => {
	const [linearColor, setLinearColor] = useState(color);
	// Generate an array of colors from an initial selected color
	const colors = useMemo(() => {
		return generateColorObject(generateColors(color));
	}, [color]);

	// Change color with a different one from the generated array
	const setNewColor = (index) => {
		setLinearColor(colors[index]);
	};

	// Return the current color and the setter function
	return [linearColor, setNewColor];
};
