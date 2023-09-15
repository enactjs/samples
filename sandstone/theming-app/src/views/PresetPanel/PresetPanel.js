import {useCallback, useContext} from 'react';
import RadioItem from '@enact/sandstone/RadioItem';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {Cell, Column, Layout} from '@enact/ui/Layout';

import {setPreset} from '../../hooks/utils';
import PreviewSection from '../../components/PreviewSection';
import {AppContext, presets} from '../../constants';

import css from './PresetPanel.module.less';

const PresetPanel = () => {
	const {context, setContext} = useContext(AppContext);
	const {activeTheme, dynamicColor, handleSkin} = context;

	const onClickDynamicColor = useCallback(() => {
		const newContext = Object.assign({}, context);
		newContext.dynamicColor = context.dynamicColor === 'on' ? 'off' : 'on';
		setContext(newContext);
	}, [context, setContext]);

	const onClickHandleSkin = useCallback(() => {
		const newContext = Object.assign({}, context);
		newContext.handleSkin = context.handleSkin === 'on' ? 'off' : 'on';
		setContext(newContext);
	}, [context, setContext]);

	const onClickHandlePreset = useCallback((ev) => {
		const newContext = setPreset({preset: ev.currentTarget.id, context: context});
		setContext(newContext);
	}, [context, setContext]);

	return (
		<Layout className={css.presetPanel}>
			<Cell className={css.customizeSection} size="40%">
				<Column>
					{Object.entries(presets).map(([key, value]) =>
						<RadioItem onClick={onClickHandlePreset} id={key} key={key} selected={key === activeTheme}>{value}</RadioItem>
					)}
					<SwitchItem onClick={onClickDynamicColor} selected={dynamicColor === 'on'}>Activate dynamic color mode</SwitchItem>
					<SwitchItem onClick={onClickHandleSkin} selected={handleSkin === 'on'}>Adjust skin automatically</SwitchItem>
				</Column>
			</Cell>
			<PreviewSection />
		</Layout>
	);
};

export default PresetPanel;
