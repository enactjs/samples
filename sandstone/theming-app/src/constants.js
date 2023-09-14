import {createContext} from "react";

export const presets = {
	"Default Theme": {},
	"Light blue Theme": {},
	"Blue Theme": {},
	"Light Green Theme": {},
	"Green Theme": {},
	"Light Purple Theme": {},
	"Purple Theme": {},
	"Light Red Theme": {},
	"Red Theme": {}
};

export const dynamicColorsContext = {
	activeTheme: 'defaultTheme',
	dynamicColor: 'on',
	handleSkin: 'off',
	backgroundColor: '#000000',
	componentBackgroundColor: '#7D848C',
	focusBackgroundColor: '#E6E6E6',
	popupBackgroundColor: '#575E66',
	subtitleTextColor: '#ABAEB3',
	textColor: '#E6E6E6'
};

export const AppContext = createContext(null);
