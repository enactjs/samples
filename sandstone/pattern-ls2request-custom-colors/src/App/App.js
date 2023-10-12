import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import LS2Request from '@enact/webos/LS2Request';
import {useEffect, useState} from 'react';

import {generateStylesheet} from '../hooks/generateStylesheet';
import MainView from '../views/MainView';
import screenTypes from '../../screenTypes.json';

import {AppContext, dynamicColorsContext} from '../constants';

const request = new LS2Request();

const defaultKeyThemeValue = JSON.stringify({
	"version":"0.1",
	"activeTheme":"defaultTheme",
	"dynamicColor":"off",
	"handleSkin":"off",
	"backgroundColor":"#000000",
	"componentBackgroundColor":"#7D848C",
	"focusBackgroundColor":"#E6E6E6",
	"popupBackgroundColor":"#575E66",
	"subtitleTextColor":"#ABAEB3",
	"textColor":"#E6E6E6",
	colors: generateStylesheet(
		"#000000",
		"#7D848C",
		"#E6E6E6",
		"#575E66",
		"#ABAEB3",
		"#E6E6E6"
	)
});

const App = (props) => {
	const [context, setContext] = useState(dynamicColorsContext);

	useEffect(() => {
		// check if app is running on webOS system
		if (typeof window === 'object' && window.PalmSystem && window.PalmSystem.launchParams) {
			// make a GET call to service settings to check the value of `theme` key
			request.send({
				service: 'luna://com.webos.service.settings/',
				method: 'getSystemSettings',
				parameters: {
					category: 'customUi',
					keys: ['theme']
				},
				onSuccess: (res) => {
					// if `theme` key is populated, update the context with key value
					if (res.settings.theme !== '' && res) {
						const parsedKeyData = JSON.parse(res.settings.theme);
						setContext({...parsedKeyData});
					// if `theme` key is an empty string, update the context with a default value, then make a SET call to service settings and set
					// `theme` key  with a default value
					} else if (res.settings.theme === '') {
						setContext(JSON.parse(defaultKeyThemeValue));
						request.send({
							service: 'luna://com.webos.service.settings/',
							method: 'setSystemSettings',
							parameters: {
								category: 'customUi',
								settings: {
									theme: defaultKeyThemeValue
								}
							}
						});
					}
				}
			});
		}
	}, []);

	return (
		<AppContext.Provider value={{context, setContext}}>
			<MainView {...props} />
		</AppContext.Provider>
	);
};

export default ThemeDecorator({ri: {screenTypes}}, App);
