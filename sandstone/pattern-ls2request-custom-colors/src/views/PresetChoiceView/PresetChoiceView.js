import RadioItem from '@enact/sandstone/RadioItem';
import Scroller from '@enact/sandstone/Scroller';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {Cell, Column, Layout} from '@enact/ui/Layout';
import {useCallback, useContext} from 'react';

import {AppContext, presets} from '../../constants';
// This is a function that will send the updated variables inside WebOS
import {setSystemVariables} from '../../lunaCalls/setSystemVariables';
// This is an object that contains the css files for all the presets
// It will be used when we swap presets
import presetColors from '../../presets';
// This is an object that contains the default customization colors for all the presets
// It will be used when we swap presets
import presetDefaultColors from '../../presetsDefaultColors';

import css from './PresetChoiceView.module.less';
import {isSystemWebOS} from "../../utils";

const PresetChoiceView = () => {
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
			// First we check if the system the app is running on is WebOS
			// If it is not we exit skip this step
			if (isSystemWebOS) setSystemVariables(newContext);

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
			// First we check if the system the app is running on is WebOS
			// If it is not we exit skip this step
			setSystemVariables(newContext);

			// Here we return the updated context that contains our changes
			return newContext;
		});
	}, [setContext]);

	return (
		<Layout className={css.presetPanel}>
			<Cell className={css.customizeSection}>
				<Column>
					<Scroller>
						{Object.entries(presets).map(([key, value]) =>
							<RadioItem onClick={handleChangePreset} id={key} key={key} selected={key === context.activeTheme}>{value}</RadioItem>
						)}
					</Scroller>
					<SwitchItem onClick={handleModeChange} selected={context.lightMode}>Light Mode</SwitchItem>
				</Column>
			</Cell>
		</Layout>
	);
};

export default PresetChoiceView;
