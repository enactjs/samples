import {createContext} from "react";

export const presets = {
	defaultTheme: "Default Theme",
	blueTheme1: "Light Blue Theme",
	blueTheme2: "Blue Theme",
	greenTheme1: "Light Green Theme",
	greenTheme2: "Green Theme",
	purpleTheme1: "Light Purple Theme",
	purpleTheme2: "Purple Theme",
	redTheme1: "Light Red Theme",
	redTheme2: "Red Theme"
};

export const dynamicColorsContext = {
	activeTheme: 'defaultTheme',
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
