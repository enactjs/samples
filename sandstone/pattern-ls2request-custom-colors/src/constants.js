import {createContext} from "react";

export const presets = {
	defaultColorSet: "Default Color Set",
	blueColorSet1: "Light Blue Color Set",
	blueColorSet2: "Blue Color Set",
	greenColorSet1: "Light Green Color Set",
	greenColorSet2: "Green Color Set",
	purpleColorSet1: "Light Purple Color Set",
	purpleColorSet2: "Purple Color Set",
	redColorSet1: "Light Red Color Set",
	redColorSet2: "Red Color Set"
};

export const customColorsContext = {
	activeTheme: 'defaultColorSet',
	dynamicColor: 'off',
	handleSkin: 'off',
	backgroundColor: '#000000',
	componentBackgroundColor: '#7D848C',
	focusBackgroundColor: '#E6E6E6',
	popupBackgroundColor: '#575E66',
	subtitleTextColor: '#ABAEB3',
	textColor: '#E6E6E6'
};

export const AppContext = createContext(null);
