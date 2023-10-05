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

	// Toggle using dynamic color mode which will modify the luminosity and saturation of your theme colors depending on the current time
	const onClickDynamicColor = useCallback(() => {
		const newContext = Object.assign({}, context);
		newContext.dynamicColor = context.dynamicColor === 'on' ? 'off' : 'on';
		setContext(newContext);

		if (typeof window === 'object' && window.PalmSystem && window.PalmSystem.launchParams) {
			changeSettings({
				category: 'customUi',
				settings: {
					theme: JSON.stringify(newContext)
				}
			});
		}

	}, [context, setContext]);

	// Toggle adjusting skin automatically, which means that the system will choose between Sandstone neutral and light modes according to the colors you have set
	const onClickHandleSkin = useCallback(() => {
		const newContext = Object.assign({}, context);
		newContext.handleSkin = context.handleSkin === 'on' ? 'off' : 'on';
		setContext(newContext);

		if (typeof window === 'object' && window.PalmSystem && window.PalmSystem.launchParams) {
			changeSettings({
				category: 'customUi',
				settings: {
					theme: JSON.stringify(newContext)
				}
			});
		}
	}, [context, setContext]);

	// Choose from an existing preset theme
	const onClickHandlePreset = useCallback((ev) => {
		const newContext = setPreset({preset: ev.currentTarget.id, context: context});
		setContext(newContext);

		if (typeof window === 'object' && window.PalmSystem && window.PalmSystem.launchParams) {
			changeSettings({
				category: 'customUi',
				settings: {
					theme: JSON.stringify(newContext)
				}
			});
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
