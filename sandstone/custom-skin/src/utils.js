// const getRandomColor = (color) => {
// 	let p = 1,
// 		temp,
// 		random = Math.random(),
// 		result = '#';
//
// 	while (p < color.length) {
// 		temp = parseInt(color.slice(p, p += 2), 16);
// 		temp += Math.floor((255 - temp) * random);
// 		result += temp.toString(16).padStart(2, '0');
// 	}
// 	return result;
// };

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

const getRandomColor3 = (colorToBeConverted, inc) => {
	const color = convertHexToRGB(colorToBeConverted);

	const highestValue = Math.max(...color);
	const lowerValues = color.filter(value => value !== highestValue);
	let newColor = color;

	switch (lowerValues.length) {
		case 0: {
			if (highestValue < 85) {
				newColor = color.map(value => {
					return value + 20 * (inc + 1);
				})
			} else if (highestValue < 170) {
				if (!inc % 2) {
					newColor = color.map(value => {
						return value - 20 * (inc + 1);
					})
				} else {
					newColor = color.map(value => {
						return value + 20 * inc;
					})
				}
			} else {
				newColor = color.map(value => {
					return value - 20 * (inc + 1);
				})
			}
			break;
		}
		case 1: {
			if (highestValue < 85) {
				console.log('222200')
				newColor = color.map(value => {
					if (value !== lowerValues[0]) {
						return value + 20 * (inc + 1);
					}
					return value;
				})
			} else if (highestValue < 170) {
				if (!inc % 2) {
					console.log('888800')
					newColor = color.map(value => {
						if (value !== lowerValues[0])
						{
							if (lowerValues[0] <= value - 20 * (inc + 1)) {
								return value - 20 * (inc + 1);
							}
							return value;
						} else {
							if (value > highestValue - 20 * (inc + 1) ) {
								return value - 20 * (inc + 1);
							}
							return value;
						}
					})
				} else {
					newColor = color.map(value => {
						if (value !== lowerValues[0]) {
							return value + 20 * inc;
						}
						return value;
					})
				}
			} else {
				newColor = color.map(value => {
					if (value !== lowerValues[0])
					{
						if (lowerValues[0] <= value - 20 * (inc + 1)) {
							return value - 20 * (inc + 1);
						}
						return value;
					} else {
						if (value > highestValue - 20 * (inc + 1) ) {
							return value - 20 * (inc + 1);
						}
						return value;
					}
				})
			}
			break;
		}
		case 2: {
			newColor = color.map((value) => {
				console.log(value , ' ' , value + 20 * (inc + 1) , ' ' , value - 20 * (inc + 1));
				if (value === highestValue) {
					if (value + 20 * (inc + 1) < 255) {
						return value + 20 * (inc + 1);
					}
					return value;
				} else {
					if(highestValue + 20 * (inc + 1) < 255) {
						return value;
					}
					if(highestValue > lowerValues[0] + 20 * (inc + 1) && highestValue > lowerValues[1] + 20 * (inc + 1)) {
						return value + 20 * (inc + 1);
					}
					if(value - 20 * (inc + 1) > 0) {
						return value - 20 * (inc + 1);
					}
					return 0;
				}
			});
			break;
		}
	}

	return convertRGBToHex(newColor);
}

const getRandomColor2 = (colorToBeConverted, inc) => {
	const color = convertHexToRGB(colorToBeConverted);

	const highestValue = Math.max(...color);
	const lowerValues = color.filter(value => value !== highestValue);

	const newColor = color.map(value => {
		if (lowerValues[0] === lowerValues[1] && value !== highestValue) {
			// console.log(value)
			return value + 20 * (inc + 1);
		} else if (value === highestValue && lowerValues[0] === lowerValues[1]) {
			return value - 25 * (inc + 1);
		} else if (value === lowerValues[0] && lowerValues[0] !== highestValue) {
			return value + 25 * (inc + 1);
		} else if (value === lowerValues[1] && lowerValues[1] !== highestValue) {
			return value + 25 * (inc + 1);
		} else if (value === highestValue && lowerValues[0] >= 25 && lowerValues[1] >= 67) {
			return value + 20 * (inc + 1);
		} else if (value === highestValue && value >= 180) {
			return value - 20 * (inc + 1);
		} else if (value !== highestValue && lowerValues[0] >= 170 && lowerValues[1] >= 180) {
			return value - 30 * inc;
		}
		return value;
	})

	return convertRGBToHex(newColor);
}

const getRandomColor1 = (colorToBeConverted, inc) => {
	const color = convertHexToRGB(colorToBeConverted);

	const highestValue = Math.max(...color);
	const lowerValues = color.filter(value => value !== highestValue);

	const newColor = color.map(value => {
		if (lowerValues[0] === lowerValues[1] && value !== highestValue) {
			return value + 20 * (inc + 2)
		} else if (value < 255 && value + 30 < highestValue && value === lowerValues[0] && lowerValues[0] <= 100) {
			return value + 21 * (inc + 1);
		} else if (value < 255 && value + 30 < highestValue && value === lowerValues[1] && lowerValues[0] <= 100) {
			return value + 19 * (inc + 1);
		} else if (value === highestValue && value > lowerValues[0] && value > lowerValues[1] && lowerValues[0] <= 100 && lowerValues[1] <= 100) {
			return value - 25 * (inc + 1);
		}
		return value;
	});

	return convertRGBToHex(newColor);
};

const generateBGColors = (background) => {
	let color = background;
	let colorsArray = [];

	for (let i = 0; i < 5; i++) {
		let rc = getRandomColor3(color, i);
		colorsArray.push(rc);
	}

	const rgbFocusedTextColor = convertHexToRGB(colorsArray[2]);

	colorsArray.splice(2, 1, ...rgbFocusedTextColor);

	return colorsArray;
};

const generateTextColors = (text) => {
	let color = text;
	let colorsArray = [];

	for (let i = 0; i < 4; i++) {
		let rc = getRandomColor3(color, i);
		colorsArray.push(rc);
	}

	const rgbFocusedTextColor = convertHexToRGB(colorsArray[1]);
	const rgbSelectedColor = convertHexToRGB(colorsArray[2]);

	colorsArray.splice(1, 1, ...rgbFocusedTextColor);
	colorsArray.splice(4, 1, ...rgbSelectedColor);

	return colorsArray;
};

const generateColors = (text, background) => {
	const textColors = generateTextColors(text);
	const bgColors = generateBGColors(background);

	return [textColors[0].toUpperCase(), textColors[1], textColors[2], textColors[3], bgColors[0].toUpperCase(),
		textColors[4], textColors[5], textColors[6], bgColors[1].toUpperCase(), bgColors[2], bgColors[3], bgColors[4],
		bgColors[5].toUpperCase(), textColors[7].toUpperCase(), bgColors[6].toUpperCase()];
};

const hexColors = (color1, color2) => {
	return /^#[0-9A-F]{6}$/i.test(color1) && /^#[0-9A-F]{6}$/i.test(color2);
	// /^#[0-9A-F]{6}$/i.test(test_string) tests if test_string represents a color in hex
};

const checkColors = (arr1, arr2) => {
	for (let i = 0; i < arr1.length; ++i) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}
	return true;
};

const getColorsFromString = (colors) => {
	try {
		let colorSets = colors.map(color => color.split(':'));
		colorSets = colorSets.map(colorSet => [colorSet[0], colorSet[1].split(';')[0].replace(/ /g, '')]);
		colorSets[0][1] = colorSets[0][1].split('*/')[0];

		return colorSets;
	} catch (err) {
		// eslint-disable-next-line
		console.log(err);

		return null;
	}
};

export {
	checkColors,
	convertHexToRGB,
	convertRGBToHex,
	generateColors,
	getColorsFromString,
	hexColors
};
