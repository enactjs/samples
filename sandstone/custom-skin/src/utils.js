const getRandomColor = (color) => {
	let p = 1,
		temp,
		random = Math.random(),
		result = '#';

	while (p < color.length) {
		temp = parseInt(color.slice(p, p += 2), 16);
		temp += Math.floor((255 - temp) * random);
		result += temp.toString(16).padStart(2, '0');
	}
	return result;
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
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const getRandomColor1 = (colorToBeConverted, inc) => {
	const color = convertHexToRGB(colorToBeConverted)

	const highestValue = Math.max(...color)

	const newColor = color.map(value => {
		if (value < 255 && value + 30 < highestValue) {
			return value + 20 * inc;
		}
		return value;
	});

	return convertRGBToHex(newColor);
}

const generateBGColors = (background) => {
	let color = background;
	let colorsArray = [];

	for (let i = 0; i < 5; i++) {
		let rc = getRandomColor1(color, i);
		colorsArray.push(rc);
	}

	const rgbFocusedTextColor = convertHexToRGB(colorsArray[2]);

	console.log(colorsArray)
	colorsArray.splice(2, 1, ...rgbFocusedTextColor);

	// console.log(colorsArray)
	return colorsArray;
};

const generateTextColors = (text) => {
	let color = text;
	let colorsArray = [];

	for (let i = 0; i < 4; i++) {
		let rc = getRandomColor1(color, i);
		colorsArray.push(rc);
	}

	const rgbFocusedTextColor = convertHexToRGB(colorsArray[1]);
	const rgbSelectedColor = convertHexToRGB(colorsArray[2]);

	console.log(colorsArray)
	colorsArray.splice(1, 1, ...rgbFocusedTextColor);
	colorsArray.splice(4, 1, ...rgbSelectedColor);

	// console.log(colorsArray)
	return colorsArray;
};

const generateColors = (text, background) => {
	const textColors = generateTextColors(text);
	const bgColors = generateBGColors(background);

	return [textColors[0], textColors[1], textColors[2], textColors[3], bgColors[0], textColors[4], textColors[5],
		textColors[6], bgColors[1], bgColors[2], bgColors[3], bgColors[4], bgColors[5], textColors[7], bgColors[6]];
};

const hexColors = (color1, color2) => {
	return color1.length === 7 && color2.length === 7 && color1[0] === '#' && color2[0] === '#' &&
		color1.toUpperCase() <= '#FFFFFF' && color1.toUpperCase() >= '#000000' &&
		color2.toUpperCase() <= '#FFFFFF' && color2.toUpperCase() >= '#000000';
};

const checkColors = (arr1, arr2) => {
	for (let i = 0; i < arr1.length; ++i) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}
	return true;
};

export {
	checkColors,
	generateColors,
	hexColors
};
