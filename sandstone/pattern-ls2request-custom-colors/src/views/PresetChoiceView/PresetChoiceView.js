import RadioItem from '@enact/sandstone/RadioItem';
import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {Cell, Column, Layout, Row} from '@enact/ui/Layout';
import {useCallback, useContext} from 'react';

import {AppContext, presets} from '../../constants';
// This is a function that will send the updated variables inside WebOS
import {setVariablesWebOS} from '../../lunaCalls/setVariables';
// This is an object that contains the css files for all the presets
// It will be used when we swap presets
import presetColors from '../../presets';
// This is an object that contains the default customization colors for all the presets
// It will be used when we swap presets
import presetDefaultColors from '../../presetsDefaultColors';

import css from './PresetChoiceView.module.less';
import IconItem from '@enact/sandstone/IconItem';

const PresetChoiceView = ({navigate}) => {
	// Here we get the context of the app and the setter function for it
	const {context, setContext} = useContext(AppContext);
	// Function that handles the change of the active preset
	const handleChangePreset = useCallback((ev) => {
		// Based on the id we determine what preset the user chose
		const selectedPreset = ev.currentTarget.id;

		// We update the context with the new value for the active preset
		// and, we load the preset colors inside the color variable
		setContext((context) => {
			const newContext = Object.assign(
				{},
				// Here we add the existing context as a base for the new one
				context,
				// Here we replace the activeTheme and the css file of the context
				{
					activeTheme: selectedPreset,
					colors: presetColors[selectedPreset]
				},
				// Here we replace the customization colors with the default ones for the selected preset
				presetDefaultColors[selectedPreset]
			);

			// Here we update the variables inside WebOS using luna calls
			setVariablesWebOS(newContext);

			// Here we return the updated context that contains our changes
			return newContext;
		});
	}, [setContext]);

	// Function that handles the change of the lightMode
	const handleModeChange = useCallback(() => {
		// We update the context with the new value for the lightMode
		setContext((context) => {
			const newContext = Object.assign(
				{},
				// Here we add the existing context as a base for the new one
				context,
				// Here we replace the lightMode with the new value
				{lightMode: !context.lightMode}
			);

			// Here we update the variables inside WebOS using luna calls
			setVariablesWebOS(newContext);

			// Here we return the updated context that contains our changes
			return newContext;
		});
	}, [setContext]);

	return (
		<Layout className={css.presetPanel}>
			<Cell className={css.customizeSection}>
				<Column>
					<Scroller className={css.scroller}>
						{Object.entries(presets).map(([key, value]) =>
							<RadioItem onClick={handleChangePreset} id={key} key={key} selected={key === context.activeTheme}>{value}</RadioItem>
						)}
					</Scroller>
					<SwitchItem className={css.switchItem} onClick={handleModeChange} selected={context.lightMode}>Light Mode</SwitchItem>
					<Row className={css.footer}>
						<IconItem disabled icon="picture" label="Presets" />
						<IconItem icon="gear" label="Customization" onClick={useCallback(() => navigate(1), [navigate])} />
						<IconItem icon="picturemode" label="Showcase" onClick={useCallback(() => navigate(2), [navigate])} />
					</Row>
				</Column>
			</Cell>
		</Layout>
	);
};

export default PresetChoiceView;
