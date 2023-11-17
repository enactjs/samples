import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import LS2Request from '@enact/webos/LS2Request';
import {useCallback, useContext, useEffect, useState} from 'react';

import ColorCustomizationView from '../ColorCustomizationView';
import PresetChoiceView from '../PresetChoiceView';
import ShowcaseView from '../ShowcaseView';

import {AppContext, customColorsContext} from '../../constants';
import {getSystemSettings} from '../../lunaCalls/getSystemSettings';
import {isSystemWebOS} from '../../utils';

const MainView = (rest) => {
	// Here we get the context of the app
	const {context, setContext} = useContext(AppContext);
	const [panelIndex, setPanelIndex] = useState(0);

	// Based on the lightMode variable from our context we determine the appropriate skin for our app
	const skin = context.lightMode ? 'light' : 'neutral';

	const navigate = useCallback((index) => {
		setPanelIndex(index);
	}, []);

	// NOTE: this useEffect might be removed in the future, when we'll have a default value for `theme` key
	useEffect(() => {
		// First we check if the system the app is running on is WebOS
		// If it is not we exit from this useEffect
		if (isSystemWebOS) {
			// On app initialization in webOS environment, call ServiceSettings and check the value for `theme` key
			new LS2Request().send({
				service: 'luna://com.webos.service.settings/',
				method: 'getSystemSettings',
				parameters: {
					category: 'customUi',
					keys: ['theme']
				},
				onSuccess: (res) => {
					// if `theme` key is empty, populate with a default value
					if (res.settings.theme === '') {
						new LS2Request().send({
							service: 'luna://com.webos.service.settings/',
							method: 'setSystemSettings',
							parameters: {
								category: 'customUi',
								keys: JSON.stringify(customColorsContext)
							}
						});
					}
				}
			});
		}
	}, []);

	// update app context with fetched data from SettingsService
	useEffect(() => {
		// First we check if the system the app is running on is WebOS
		// If it is not we exit from this useEffect
		if (isSystemWebOS) getSystemSettings(setContext);
	}, [setContext]);

	return (
		<Panels
			{...rest}
			index={panelIndex}
			noCloseButton
			noBackButton
			skin={skin}
		>
			<Panel>
				<Header subtitle="Choose preset colors" title="Color Customization App" />
				<PresetChoiceView navigate={navigate} />
			</Panel>
			<Panel>
				<Header subtitle="Customize App Colors" title="Color Customization App" />
				<ColorCustomizationView navigate={navigate} />
			</Panel>
			<Panel>
				<Header subtitle="Showcase Panel" title="Color Customization App" />
				<ShowcaseView navigate={navigate} />
			</Panel>
		</Panels>
	);
};

export default MainView;
