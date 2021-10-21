const sendData = async (data, name, NTColor, BGColor) => {
	const newData = [name, BGColor, NTColor, ...data];
	const writeToCSS = new window.XMLHttpRequest();

	writeToCSS.open('POST', 'http://localhost:5000/write');
	writeToCSS.send(JSON.stringify({colors: newData}));
};

const generateCSS = async () => {
	const writeToCSS = new window.XMLHttpRequest();

	writeToCSS.onload = () => {
		let link = document.createElement('a');
		link.download = 'custom-skin.css';
		let blob = new window.Blob([writeToCSS.response], {type: 'text/css'});
		link.href = URL.createObjectURL(blob);
		link.click();
		URL.revokeObjectURL(link.href);
	};
	writeToCSS.open('GET', 'http://localhost:5000/cssfile');
	writeToCSS.responseType = 'text';
	writeToCSS.send();
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

const generateBGColors = (background) => {
	let color = background;
	let colorsArray = [];

	for (let i = 0; i < 5; i++) {
		let rc = getRandomColor(color, i);
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
		let rc = getRandomColor(color, i);
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
	generateCSS,
	getColorsFromString,
	hexColors,
	sendData
};
