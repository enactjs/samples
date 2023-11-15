import IconItem from '@enact/sandstone/IconItem';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import LS2Request from '@enact/webos/LS2Request';
import {useCallback, useContext, useEffect, useState} from 'react';

import ColorCustomizationView from '../ColorCustomizationView';
import PresetChoiceView from '../PresetChoiceView';
import ShowcaseView from '../ShowcaseView';

import {AppContext, customColorsContext} from '../../constants';
import {getSystemSettings} from '../../lunaCalls/getSystemSettings';

const MainView = (rest) => {
	// Here we get the context of the app
	const {context, setContext} = useContext(AppContext);
	const [panelIndex, setPanelIndex] = useState(0);

	// Based on the lightMode variable from our context we determine the appropriate skin for our app
	const skin = context.lightMode ? 'light' : 'neutral';

	const forward = useCallback(() => {
		setPanelIndex(panelIndex + 1);
	}, [panelIndex]);

	const backward = useCallback(() => {
		setPanelIndex(panelIndex - 1);
	}, [panelIndex]);

	// NOTE: this useEffect might be removed in the future, when we'll have a default value for `theme` key
	useEffect(() => {
		// On app initialization in webOS environment, call ServiceSettings and check the value for `theme` key
		if (typeof window === 'object' && window.webOSSystem && window.webOSSystem.launchParams) {
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
						})
					}
				}
			})
		}
	}, []);

	// update app context with fetched data from SettingsService
	useEffect(() => {
		getSystemSettings(setContext);
	}, [setContext]);

	return (
		<Panels
			{...rest}
			index={panelIndex}
			noCloseButton
			onBack={backward}
			skin={skin}
		>
			<Panel>
				<Header subtitle="Choose preset colors" title="Color Customization App">
					<slotAfter>
						<IconItem icon="arrowsmallright" label="Customize Colors" onClick={forward} />
					</slotAfter>
				</Header>
				<PresetChoiceView />
			</Panel>
			<Panel>
				<Header subtitle="Customize App Colors" title="Color Customization App">
					<slotAfter>
						<IconItem icon="arrowsmallright" label="Showcase Panel" onClick={forward} />
					</slotAfter>
				</Header>
				<ColorCustomizationView />
			</Panel>
			<Panel>
				<Header subtitle="Showcase Panel" title="Color Customization App" />
				<ShowcaseView />
			</Panel>
		</Panels>
	);
};

export default MainView;
