const hexColors = (color1, color2) => {
	return /^#[0-9A-F]{6}$/i.test(color1) && /^#[0-9A-F]{6}$/i.test(color2);
	// /^#[0-9A-F]{6}$/i.test(test_string) tests if test_string represents a color in hex
};

const convertHexToRGB = (hex) => {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	] : null;
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

const generateCSSFile = (fileName, colors) => {
	let link = document.createElement('a');
	link.download = fileName?.length ? `${fileName}.css` : `custom_skin.css`;
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
		text, text, textColors[2].toUpperCase(), background, bgColors[2].toUpperCase(), textColors[2].toUpperCase(),
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
	convertHexToRGB,
	convertRGBToHex,
	generateColors,
	generateCSS,
	generateCSSFile,
	getColorsFromString,
	hexColors
};
