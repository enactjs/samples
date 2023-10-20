import LS2Request from '@enact/webos/LS2Request';
import {generateStylesheet} from './generateStylesheet';

// set `theme` key when presets or colors are changed
export const changeSettings = (params) => {
	return new Promise((resolve) => {
		new LS2Request().send({
			service: 'luna://com.webos.service.settings/',
			method: 'setSystemSettings',
			parameters: params,
			onSuccess: (res) => {
				// eslint-disable-next-line no-console
				console.log('setSystemSettings onSuccess', params);
				resolve(res);
			}
		});
	});
};

export const hexToHSL = (hex) => {
	// Convert hex to RGB first
	let r = 0, g = 0, b = 0;
	if (hex.length === 4) {
		r = parseInt(hex[1] + hex[1], 16);
		g = parseInt(hex[2] + hex[2], 16);
		b = parseInt(hex[3] + hex[3], 16);
	} else if (hex.length === 7) {
		r = parseInt(hex.slice(1, 3), 16);
		g = parseInt(hex.slice(3, 5), 16);
		b = parseInt(hex.slice(5), 16);
	}
	// Then convert RGB to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h, s, l;
	if (delta === 0) {
		h = 0;
	} else if (cmax === r) {
		h = ((g - b) / delta) % 6;
	} else if (cmax === g) {
		h = (b - r) / delta + 2;
	} else {
		h = (r - g) / delta + 4;
	}
	h = Math.round(h * 60);
	if (h < 0) {
		h += 360;
	}
	l = (cmax + cmin) / 2;
	s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);
	return {h: Math.round(h), s: Math.round(s), l: Math.round(l)};
};

export const HSLToHex = ({h, s, l}) => {
	s /= 100;
	l /= 100;
	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs((h / 60) % 2 - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;
	if (0 <= h && h < 60) {
		r = c; g = x; b = 0;
	} else if (60 <= h && h < 120) {
		r = x; g = c; b = 0;
	} else if (120 <= h && h < 180) {
		r = 0; g = c; b = x;
	} else if (180 <= h && h < 240) {
		r = 0; g = x; b = c;
	} else if (240 <= h && h < 300) {
		r = x; g = 0; b = c;
	} else if (300 <= h && h < 360) {
		r = c; g = 0; b = x;
	}
	// Having obtained RGB, convert channels to hex
	r = Math.round((r + m) * 255).toString(16);
	g = Math.round((g + m) * 255).toString(16);
	b = Math.round((b + m) * 255).toString(16);
	// Prepend 0s, if necessary
	if (r.length === 1) {
		r = "0" + r;
	}
	if (g.length === 1) {
		g = "0" + g;
	}
	if (b.length === 1) {
		b = "0" + b;
	}
	return "#" + r + g + b;
};

const generateColorsDayMode = (baseColor, numColors) => {
	// Create an array to hold the colors
	let colors = [baseColor];
	// Calculate the step size for increasing saturation and luminosity
	let step = 0.02;
	// Loop through the number of colors requested
	for (let i = 0; i < numColors - 1; i++) {
		// Convert the base color to HSL format
		const currentColor = hexToHSL(colors[i]);
		// Calculate the saturation for this color
		let luminosity,
			saturation;
		if (i % 2) {
			luminosity = currentColor.l - i / 2 * step;
			saturation = currentColor.s;
		} else {
			luminosity = currentColor.l;
			saturation = currentColor.s + i / 2 * step;
		}
		let hslColor;
		// Create the color in HSL format
		if (saturation <= 100 && luminosity >= 40) {
			hslColor = {h: currentColor.h, s: saturation, l: luminosity};
		} else if (saturation > 100 && luminosity >= 40) {
			hslColor = {h: currentColor.h, s: 100, l: luminosity};
		} else if (saturation <= 100 && luminosity < 40) {
			hslColor = {h: currentColor.h, s: saturation, l: 40};
		} else if (saturation > 100 && luminosity < 40) {
			hslColor = {h: currentColor.h, s: 100, l: 40};
		}
		// Convert the color back to hex format and add it to the array
		let hexColor = HSLToHex(hslColor);
		colors.push(hexColor);
	}
	return colors;
};

const generateColorsNightMode = (baseColor, numColors) => {
	// Create an array to hold the colors
	let colors = [baseColor];
	// Calculate the step size for increasing saturation and luminosity
	let step = 0.03;
	// Loop through the number of colors requested
	for (let i = 0; i < numColors - 1; i++) {
		// Convert the base color to HSL format
		const currentColor = hexToHSL(colors[i]);
		// Calculate the saturation for this color
		let luminosity,
			saturation;
		if (i % 2) {
			luminosity = currentColor.l + i / 2 * step;
			saturation = currentColor.s;
		} else {
			luminosity = currentColor.l;
			saturation = currentColor.s - i / 2 * step;
		}
		let hslColor;
		// Create the color in HSL format
		if (saturation >= 30 && luminosity <= 65) {
			hslColor = {h: currentColor.h, s: saturation, l: luminosity};
		} else if (saturation < 30 && luminosity <= 65) {
			hslColor = {h: currentColor.h, s: 30, l: luminosity};
		} else if (saturation >= 30 && luminosity > 65) {
			hslColor = {h: currentColor.h, s: saturation, l: 65};
		} else if (saturation < 30 && luminosity > 65) {
			hslColor = {h: currentColor.h, s: 30, l: 65};
		}
		// Convert the color back to hex format and add it to the array
		let hexColor = HSLToHex(hslColor);
		colors.push(hexColor);
	}
	return colors;
};

export const generateTimestamps = (step) => {
	// Generates an array of timestamps based on a specific step
	// e.g. for (step = 5) => ['00:00', '00:05', '00:10', ..., '23:55']
	const timestamps = [];
	for (let hours = 0; hours < 24; hours++) {
		for (let minutes = 0; minutes < 60; minutes += step) {
			const formattedHours = hours.toString().padStart(2, '0');
			const formattedMinutes = minutes.toString().padStart(2, '0');
			const timestamp = `${formattedHours}:${formattedMinutes}`;
			timestamps.push(timestamp);
		}
	}
	return timestamps;
};

export const generateColors = (color) => {
	// Returns an array of colors, containing 144 colors for day mode and 144 for night mode
	const dayColorsArray = generateColorsDayMode(color, 72);
	const nightColorsArray = generateColorsNightMode(color, 72);
	const array = [...nightColorsArray.reverse(), ...dayColorsArray, ...dayColorsArray.reverse(), ...nightColorsArray.reverse()];
	const offset = array.splice(0, 12);
	return [...array, ...offset];
};

export const generateColorObject = (colorArray) => {
	// Returns an object with timestamps for keys and colors for values
	// (e.g. "03:05": "#e6e6e6")
	const timestamps = generateTimestamps(5);
	return timestamps.map((element, index) => {
		return {key: element, value: colorArray[index]};
	}).reduce((prev, curr) => {
		prev[curr.key] = curr.value;
		return prev;
	}, {});
};

export const getIndex = () => {
	// Creates an index from a timestamp
	let minute = parseInt(new Date().toTimeString().substring(0, 5).slice(3));
	let hour = parseInt(new Date().toTimeString().substring(0, 8));
	let index;
	while (minute % 5 !== 0) minute++;
	if (minute >= 60) {
		minute = 0;
		hour++;
	}
	if (hour > 24) {
		hour = 1;
	}
	if (hour < 10) {
		index = '0' + hour + ':';
	} else {
		index = hour + ':';
	}
	if (minute < 10) {
		index = index + '0' + minute;
	} else {
		index = index + minute;
	}
	return index;
};

export const hexToRGB = (hex) => {
	// Converts a HEX color into an RGB one
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	] : null;
};

export const setPreset = ({preset, context}) => {
	// Changes the preset and default colors from context
	const newContext = Object.assign({}, context);
	newContext.activeTheme = preset;

	switch (preset) {
		case 'blueColorSet2':
			newContext.backgroundColor = '#181E3D';
			newContext.componentBackgroundColor = '#7D848C';
			newContext.focusBackgroundColor = '#E6E6E6';
			newContext.popupBackgroundColor = '#1E233F';
			newContext.subtitleTextColor = '#ABAEB3';
			newContext.textColor = '#E6E6E6';
			break;
		case 'blueColorSet1':
			newContext.backgroundColor = '#272829';
			newContext.componentBackgroundColor = '#7D848C';
			newContext.focusBackgroundColor = '#E6E6E6';
			newContext.popupBackgroundColor = '#292929';
			newContext.subtitleTextColor = '#ABAEB3';
			newContext.textColor = '#E6E6E6';
			break;
		case 'greenColorSet2':
			newContext.backgroundColor = '#102933';
			newContext.componentBackgroundColor = '#7D848C';
			newContext.focusBackgroundColor = '#E6E6E6';
			newContext.popupBackgroundColor = '#172D36';
			newContext.subtitleTextColor = '#ABAEB3';
			newContext.textColor = '#E6E6E6';
			break;
		case 'greenColorSet1':
			newContext.backgroundColor = '#272829';
			newContext.componentBackgroundColor = '#7D848C';
			newContext.focusBackgroundColor = '#E6E6E6';
			newContext.popupBackgroundColor = '#292929';
			newContext.subtitleTextColor = '#ABAEB3';
			newContext.textColor = '#E6E6E6';
			break;
		case 'purpleColorSet2':
			newContext.backgroundColor = '#2B1941';
			newContext.componentBackgroundColor = '#7D848C';
			newContext.focusBackgroundColor = '#E6E6E6';
			newContext.popupBackgroundColor = '#2F1F43';
			newContext.subtitleTextColor = '#848290';
			newContext.textColor = '#E6E6E6';
			break;
		case 'purpleColorSet1':
			newContext.backgroundColor = '#272829';
			newContext.componentBackgroundColor = '#7D848C';
			newContext.focusBackgroundColor = '#E6E6E6';
			newContext.popupBackgroundColor = '#292929';
			newContext.subtitleTextColor = '#ABAEB3';
			newContext.textColor = '#E6E6E6';
			break;
		case 'redColorSet2':
			newContext.backgroundColor = '#3D1A1A';
			newContext.componentBackgroundColor = '#7D848C';
			newContext.focusBackgroundColor = '#E6E6E6';
			newContext.popupBackgroundColor = '#3F2020';
			newContext.subtitleTextColor = '#807477';
			newContext.textColor = '#E6E6E6';
			break;
		case 'redColorSet1':
			newContext.backgroundColor = '#252424';
			newContext.componentBackgroundColor = '#7D848C';
			newContext.focusBackgroundColor = '#E6E6E6';
			newContext.popupBackgroundColor = '#292929';
			newContext.subtitleTextColor = '#ABAEB3';
			newContext.textColor = '#E6E6E6';
			break;
		default:
			newContext.backgroundColor = '#000000';
			newContext.componentBackgroundColor = '#7D848C';
			newContext.focusBackgroundColor = '#E6E6E6';
			newContext.popupBackgroundColor = '#575E66';
			newContext.subtitleTextColor = '#ABAEB3';
			newContext.textColor = '#E6E6E6';
			break;
	}

	newContext.colors = generateStylesheet(
		newContext.backgroundColor,
		newContext.componentBackgroundColor,
		newContext.focusBackgroundColor,
		newContext.popupBackgroundColor,
		newContext.subtitleTextColor,
		newContext.textColor,
		preset
	);
	return newContext;
};
