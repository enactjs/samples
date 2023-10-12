import {useContext, useEffect, useState} from 'react';
import {generateStylesheet} from './generateStylesheet';
import {useLinearColor} from './useLinearColor';
import {generateTimestamps, getIndex} from './utils';

import {AppContext} from '../constants';

let fakeIndex = 0;
let timestamps = generateTimestamps(5);

const useLinearSkinColor = () => {
	const fakeTimeEnabled = true;
	const [linearSkinVariants, setLinearSkinVariants] = useState('neutral');
	const {dynamicColor: enableLinearSkin, handleSkin: skinVariants, activeTheme: preset, backgroundColor, componentBackgroundColor, focusBackgroundColor, popupBackgroundColor, subtitleTextColor, textColor} = useContext(AppContext).context;
	const [linearBackgroundColor, setLinearBackgroundColor] = useLinearColor(backgroundColor);
	const [linearComponentBackgroundColor, setLinearComponentBackgroundColor] = useLinearColor(componentBackgroundColor);
	const [linearFocusBackgroundColor, setLinearFocusBackgroundColor] = useLinearColor(focusBackgroundColor);
	const [linearPopupBackgroundColor, setLinearPopupBackgroundColor] = useLinearColor(popupBackgroundColor);
	const [linearSubTextColor, setLinearSubTextColor] = useLinearColor(subtitleTextColor);
	const [linearTextColor, setLinearTextColor] = useLinearColor(textColor);

	useEffect(() => {
		// Change color luminosity and saturation at a given interval (0.5s if fakeTime is enabled, 30s if it is disabled)
		let changeColor = setInterval(() => {
			// Get index depending on timestamp
			const index = getIndex();

			if (!fakeTimeEnabled) {
				if (skinVariants === 'on') {
					// Set skin variant based on timestamp
					if (index >= '06:00' && index < '18:00') {
						setLinearSkinVariants('neutral');
					} else {
						setLinearSkinVariants('light');
					}
				}

				// Set colors from the generated colors array at a specific index depending on timestamp
				setLinearBackgroundColor(index);
				setLinearComponentBackgroundColor(index);
				setLinearFocusBackgroundColor(index);
				setLinearPopupBackgroundColor(index);
				setLinearSubTextColor(index);
				setLinearTextColor(index);
			} else {
				if (skinVariants === 'on') {
					// Set skin variant based on timestamp
					if (72 <= fakeIndex && fakeIndex <= 215) {
						setLinearSkinVariants('neutral');
					} else {
						setLinearSkinVariants('light');
					}
				}

				// Set colors from the generated colors array at a specific index depending on timestamp
				setLinearBackgroundColor(timestamps[fakeIndex]);
				setLinearComponentBackgroundColor(timestamps[fakeIndex]);
				setLinearFocusBackgroundColor(timestamps[fakeIndex]);
				setLinearPopupBackgroundColor(timestamps[fakeIndex]);
				setLinearSubTextColor(timestamps[fakeIndex]);
				setLinearTextColor(timestamps[fakeIndex]);
				if (fakeIndex < 287) {
					fakeIndex++;
				} else {
					fakeIndex = 0;
				}
			}
		}, fakeTimeEnabled ? 500 : 30 * 1000);
		return () => {
			clearInterval(changeColor);
		};
	}, [fakeTimeEnabled, setLinearBackgroundColor, setLinearComponentBackgroundColor, setLinearFocusBackgroundColor, setLinearPopupBackgroundColor, setLinearSubTextColor, setLinearTextColor, skinVariants]);

	// Appends a stylesheet containing the generated colors
	if (typeof document !== 'undefined') {
		document.getElementById('custom-skin')?.remove();
		const root = document.getElementById('root');
		const sheet = document.createElement('style');
		sheet.id = 'custom-skin';
		if (enableLinearSkin === 'on') {
			sheet.innerHTML = generateStylesheet(linearBackgroundColor, linearComponentBackgroundColor, linearFocusBackgroundColor, linearPopupBackgroundColor, linearSubTextColor, linearTextColor, preset);
		} else {
			sheet.innerHTML = generateStylesheet(backgroundColor, componentBackgroundColor, focusBackgroundColor, popupBackgroundColor, subtitleTextColor, textColor, preset);
		}
		root.appendChild(sheet);
	}

	return [skinVariants === 'on', linearSkinVariants];
};

export default useLinearSkinColor;
