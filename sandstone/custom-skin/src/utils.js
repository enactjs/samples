const hexColors = (color1, color2) => {
	return /^#[0-9A-F]{6}$/i.test(color1) && /^#[0-9A-F]{6}$/i.test(color2);
	// /^#[0-9A-F]{6}$/i.test(test_string) tests if test_string represents a color in hex
};

const convertHexToHSL = (hex) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	let r = parseInt(result[1], 16);
	let g = parseInt(result[2], 16);
	let b = parseInt(result[3], 16);

	r /= 255; g /= 255; b /= 255;

	let max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;

	if (max === min) {
		h = 0;
		s = 0; // achromatic
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}

	return {h: Math.round(360 * h), s: Math.round(s * 100), l: Math.round(l * 100)};
};

const convertHexToRGB = (hex) => {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	] : null;
};

const convertHSLToHex = (h, s, l) => {
	l /= 100;
	const a = s * Math.min(l, 1 - l) / 100;
	const f = n => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
	};
	return `#${f(0)}${f(8)}${f(4)}`;
};

const convertRGBToHex = (RGBColor) => {
	const [r, g, b] = RGBColor;
	return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const colorAlgorithm = (array, lowerValues, highestValue, inc) => {
	return array.map(value => {
		if (value !== lowerValues[0]) {
			if (lowerValues[0] < value - 20 * (inc + 1)) {
				return value - 20 * (inc + 1);
			}
			return value;
		} else {
			if (value >= highestValue - 20 * (inc + 1) ) {
				return value - 20 * (inc + 1);
			}
			return value;
		}
	});
};

const generateCSS = (colors, skinName, varNames) => {
	if(colors.length > 3) {
		return '.sandstone-theme {\n' +
			`	/* Skin Name: ${skinName ? skinName : 'Untitled'}; */\n` +
			colors?.map((color, index) => {
				const [r, g, b] = hexColors(color, '#000000') ? convertHexToRGB(color) : convertHexToRGB('#000000');
				return `	${varNames[index]}: ${varNames[index].includes('rgb') ? `${r}, ${g}, ${b}` : `${color}`};\n`;
			}).join('') + `}\n`
	}
};

const generateCSSFile = (colors) => {
	let link = document.createElement('a');
	link.download = 'custom_skin.css';
	let blob = new window.Blob([colors], {type: 'text/css'});
	link.href = URL.createObjectURL(blob);
	link.click();
	URL.revokeObjectURL(link.href);
};

const getRandomColor = (colorToBeConverted, inc) => {
	const color = convertHexToRGB(colorToBeConverted);

	const highestValue = Math.max(...color);
	const lowerValues = color.filter(value => value !== highestValue);
	let newColor = color;

	switch (lowerValues.length) {
		case 0: {
			if (highestValue < 85) {
				newColor = color.map(value => {
					return value + 20 * (inc + 1);
				});
			} else if (highestValue < 170) {
				if (!inc % 2) {
					newColor = color.map(value => {
						return value - 20 * (inc + 1);
					});
				} else {
					newColor = color.map(value => {
						return value + 20 * inc;
					});
				}
			} else {
				newColor = color.map(value => {
					return value - 20 * (inc + 1);
				});
			}
			break;
		}
		case 1: {
			if (highestValue < 85) {
				newColor = color.map(value => {
					if (value !== lowerValues[0]) {
						return value + 20 * (inc + 1);
					}
					return value;
				});
			} else if (highestValue < 170) {
				if (!inc % 2) {
					newColor = colorAlgorithm(color, lowerValues, highestValue, inc);
				} else {
					newColor = color.map(value => {
						if (value !== lowerValues[0]) {
							return value + 20 * inc;
						}
						return value;
					});
				}
			} else {
				newColor = colorAlgorithm(color, lowerValues, highestValue, inc);
			}
			break;
		}
		case 2: {
			newColor = color.map((value) => {
				if (value === highestValue) {
					if (value + 20 * (inc + 1) < 255) {
						return value + 20 * (inc + 1);
					}
					return value;
				} else {
					if (highestValue + 20 * (inc + 1) < 255) {
						return value;
					}
					if (highestValue > lowerValues[0] + 20 * (inc + 1) && highestValue > lowerValues[1] + 20 * (inc + 1)) {
						return value + 20 * (inc + 1);
					}
					if (value - 20 * (inc + 1) > 0) {
						return value - 20 * (inc + 1);
					}
					return 0;
				}
			});
			break;
		}
	}

	return convertRGBToHex(newColor);
};

const generateBGColors = (background, limit) => {
	let color = background;
	let colorsArray = [];

	for (let i = 0; i <= limit; i++) {
		let rc = getRandomColor(color, i);
		colorsArray.push(rc);
	}

	return colorsArray;
};

const generateTextColors = (text, limit) => {
	let color = text;
	let colorsArray = [];

	for (let i = 0; i <= limit; i++) {
		let rc = getRandomColor(color, i);
		colorsArray.push(rc);
	}

	return colorsArray;
};

const generateColors = (background, text) => {
	const bgColors = generateBGColors(background, 9);
	const textColors = generateTextColors(text, 8);

	return [textColors[0].toUpperCase(), background, text, bgColors[0].toUpperCase(), textColors[1].toUpperCase(), text,
		textColors[2].toUpperCase(), text, text, bgColors[1].toUpperCase(), textColors[0].toUpperCase(), textColors[2].toUpperCase(),
		text, text,	textColors[2].toUpperCase(), background, bgColors[2].toUpperCase(), textColors[2].toUpperCase(),
		bgColors[3].toUpperCase(), textColors[3].toUpperCase(), bgColors[4].toUpperCase(), text, bgColors[5].toUpperCase(),
		text, textColors[4].toUpperCase(), bgColors[6].toUpperCase(), textColors[5].toUpperCase(), text, text,
		textColors[4].toUpperCase(), textColors[6].toUpperCase(), textColors[7].toUpperCase(), textColors[7].toUpperCase(),
		background, textColors[1].toUpperCase(), bgColors[7].toUpperCase(), text, textColors[2].toUpperCase(),
		textColors[4].toUpperCase(), bgColors[8].toUpperCase(), textColors[8].toUpperCase(), textColors[1].toUpperCase(),
		bgColors[2].toUpperCase(), bgColors[9].toUpperCase()
	];
};

const getColorsFromString = (colors) => {
	try {
		let colorSets = colors.map(color => color.split(':'));
		colorSets = colorSets.map(colorSet => [colorSet[0], colorSet[1].split(';')[0].slice(1)]);
		colorSets[0][1] = colorSets[0][1].split('*/')[0];

		return colorSets;
	} catch (err) {
		// eslint-disable-next-line
		console.log(err);

		return null;
	}
};

export {
	convertHexToHSL,
	convertHexToRGB,
	convertHSLToHex,
	convertRGBToHex,
	generateColors,
	generateCSS,
	generateCSSFile,
	getColorsFromString,
	hexColors
};
