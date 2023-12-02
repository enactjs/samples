import RadioItem from '@enact/sandstone/RadioItem';
import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {Cell, Column, Layout} from '@enact/ui/Layout';
import {useCallback, useContext} from 'react';

import {changeSettings, setPreset} from '../../hooks/utils';
import PreviewSection from '../../components/PreviewSection';
import {AppContext, presets} from '../../constants';

import css from './PresetPanel.module.less';

const PresetPanel = () => {
	const {context, setContext} = useContext(AppContext);
	const {activeTheme, dynamicColor, handleSkin} = context;

	// update `theme` key with the stringified version of the context object
	const updateThemeKey = (newContext) => {
		return changeSettings({
			category: 'customUi',
			settings: {
				theme: JSON.stringify(newContext)
			}
		});
	}

	// Toggle using dynamic color mode which will modify the luminosity and saturation of your theme colors depending on the current time
	const onClickDynamicColor = useCallback(() => {
		// create a copy of the context object
		const newContext = Object.assign({}, context);
		// update the `dynamicColor` property on the new context object
		newContext.dynamicColor = context.dynamicColor === 'on' ? 'off' : 'on';
		// update app context with the new context object
		setContext(newContext);

		// check if app is running in webOS environment and update `theme` key
		if (typeof window === 'object' && window.webOSSystem && window.webOSSystem.launchParams) {
			updateThemeKey(newContext);
		}

	}, [context, setContext]);

	// Toggle adjusting skin automatically, which means that the system will choose between Sandstone neutral and light modes according to the colors you have set
	const onClickHandleSkin = useCallback(() => {
		// create a copy of the context object
		const newContext = Object.assign({}, context);
		// update the `handleSkin` property on the new context object
		newContext.handleSkin = context.handleSkin === 'on' ? 'off' : 'on';
		// update app context with the new context object
		setContext(newContext);

		// check if app is running in webOS environment and update `theme` key
		if (typeof window === 'object' && window.webOSSystem && window.webOSSystem.launchParams) {
			updateThemeKey(newContext);
		}
	}, [context, setContext]);

	// Choose from an existing preset theme
	const onClickHandlePreset = useCallback((ev) => {
		// create a copy of the app context and set the colors for the selected preset
		const newContext = setPreset({preset: ev.currentTarget.id, context: context});
		// update app context with the new context object
		setContext(newContext);

		// check if app is running in webOS environment and update `theme` key
		if (typeof window === 'object' && window.webOSSystem && window.webOSSystem.launchParams) {
			updateThemeKey(newContext);
		}
	}, [context, setContext]);

	return (
		<Layout className={css.presetPanel}>
			<Cell className={css.customizeSection} size="40%">
				<Column>
					<Scroller className={css.scroller}>
						{Object.entries(presets).map(([key, value]) =>
							<RadioItem className={css.radioItem} onClick={onClickHandlePreset} id={key} key={key} selected={key === activeTheme}>{value}</RadioItem>
						)}
					</Scroller>
					<SwitchItem className={css.switchItem} onClick={onClickDynamicColor} selected={dynamicColor === 'on'}>Activate dynamic color mode</SwitchItem>
					<SwitchItem className={css.switchItem} onClick={onClickHandleSkin} selected={handleSkin === 'on'}>Adjust skin automatically</SwitchItem>
				</Column>
			</Cell>
			<PreviewSection />
		</Layout>
	);
};

export default PresetPanel;
