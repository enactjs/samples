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
	const {dynamicColor: enableLinearSkin, handleSkin: skinVariants, activeTheme: preset, backgroundColor, componentBackgroundColor, focusBackgroundColor, popupBackgroundColor, subtitleTextColor, textColor, colors} = useContext(AppContext).context;
	const [linearBackgroundColor, setLinearBackgroundColor] = useLinearColor(backgroundColor);
	const [linearComponentBackgroundColor, setLinearComponentBackgroundColor] = useLinearColor(componentBackgroundColor);
	const [linearFocusBackgroundColor, setLinearFocusBackgroundColor] = useLinearColor(focusBackgroundColor);
	const [linearPopupBackgroundColor, setLinearPopupBackgroundColor] = useLinearColor(popupBackgroundColor);
	const [linearSubTextColor, setLinearSubTextColor] = useLinearColor(subtitleTextColor);
	const [linearTextColor, setLinearTextColor] = useLinearColor(textColor);

	useEffect(() => {
		// If linear skin is not enabled we skip this useEffect's content
		if (enableLinearSkin !== 'on') return;

		// Change color luminosity and saturation at a given interval (0.5s if fakeTime is enabled, 30s if it is disabled)
		let changeColor = setInterval(() => {
			// Get index depending on timestamp
			const index = getIndex();
			if (!fakeTimeEnabled) {
				if (skinVariants === 'on') {
					// Set skin variant based on timestamp
					if (index >= '05:00' && index < '17:00') {
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
					// The reason we chose the values 60 and 203 is that each increase in fakeIndex represents 5 minutes
					// This way the skin changes coincides with '05:00' and '17:00'
					if (60 <= fakeIndex && fakeIndex <= 203) {
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

				// The reason we chose the value 287 is that each increase in fakeIndex represents 5 minutes
				// This way from 0 to 287 we have the time interval between '00:00' to '23:55'
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
	}, [enableLinearSkin, fakeTimeEnabled, setLinearBackgroundColor, setLinearComponentBackgroundColor, setLinearFocusBackgroundColor, setLinearPopupBackgroundColor, setLinearSubTextColor, setLinearTextColor, skinVariants]);

	useEffect(() => {
		// Appends a stylesheet containing the generated colors
		if (typeof document !== 'undefined') {
			document.getElementById('custom-skin')?.remove();
			const root = document.getElementById('root');
			const sheet = document.createElement('style');
			sheet.id = 'custom-skin';
			if (enableLinearSkin === 'on') {
				sheet.innerHTML = generateStylesheet(linearBackgroundColor, linearComponentBackgroundColor, linearFocusBackgroundColor, linearPopupBackgroundColor, linearSubTextColor, linearTextColor, preset);
			} else {
				sheet.innerHTML = colors;
			}
			root.appendChild(sheet);
		}
	}, [colors, enableLinearSkin, linearBackgroundColor, linearComponentBackgroundColor, linearFocusBackgroundColor, linearPopupBackgroundColor, linearSubTextColor, linearTextColor, preset]);

	return [skinVariants === 'on', linearSkinVariants];
};

export default useLinearSkinColor;
