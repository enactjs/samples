import Button from '@enact/sandstone/Button';
import ColorPicker from '@enact/sandstone/ColorPicker';
import Scroller from '@enact/sandstone/Scroller';
import {Cell, Column, Layout} from '@enact/ui/Layout';
import {useCallback, useContext} from 'react';

import {AppContext} from '../../constants';
// This is a function that will send the updated variables inside WebOS
import {setVariablesWebOS} from '../../lunaCalls/setVariables';
// This is an object that contains the default customization colors for all the presets
// It will be used when we press the reset button
import presetDefaultColors from '../../presetsDefaultColors';

import css from './ColorCustomizationView.module.less';

const ColorCustomizationView = () => {
	// Here we get the context of the app and the setter function for it
	const {context, setContext} = useContext(AppContext);
	// Function that handles the change of colors for the application
	const handleColorChange = useCallback((customizationColor, colorValue) => {
		setContext((context) => {
			const newContext = Object.assign(
				{},
				// Here we add the existing context as a base for the new one
				context,
				// Here we assign to the customization color (represented by the customizationColor prop) it's new value
				{[customizationColor]: colorValue}
			);

			// Here we update the variables inside WebOS using luna calls
			setVariablesWebOS(newContext);

			// Here we return the updated context that contains our changes
			return newContext;
		});
	}, [setContext]);

	const handleResetButton = useCallback(() => {
		setContext((context) => {
			const newContext = Object.assign(
				{},
				// Here we add the existing context as a base for the new one
				context,
				// Here we replace the lightMode with the new value
				presetDefaultColors[context.activeTheme]
			);

			// Here we update the variables inside WebOS using luna calls
			setVariablesWebOS(newContext);

			// Here we return the updated context that contains our changes
			return newContext;
		});
	}, [setContext]);

	const handleBackgroundColor = useCallback((ev) => {
		handleColorChange('backgroundColor', ev);
	}, [handleColorChange]);

	const handleComponentBackgroundColor = useCallback((ev) => {
		handleColorChange('componentBackgroundColor', ev);
	}, [handleColorChange]);

	const handleFocusBackgroundColor = useCallback((ev) => {
		handleColorChange('focusBackgroundColor', ev);
	}, [handleColorChange]);

	const handlePopupBackgroundColor = useCallback((ev) => {
		handleColorChange('popupBackgroundColor', ev);
	}, [handleColorChange]);

	const handleSubtitleTextColor = useCallback((ev) => {
		handleColorChange('subtitleTextColor', ev);
	}, [handleColorChange]);

	const handleTextColor = useCallback((ev) => {
		handleColorChange('textColor', ev);
	}, [handleColorChange]);

	return (
		<Layout className={css.customizePanel}>
			<Cell className={css.customizeSection}>
				<Column>
					<Scroller>
						<ColorPicker color={context.backgroundColor} colorHandler={handleBackgroundColor} text="Background Color" />
						<ColorPicker color={context.componentBackgroundColor} colorHandler={handleComponentBackgroundColor} text="Component Background Color" />
						<ColorPicker color={context.focusBackgroundColor} colorHandler={handleFocusBackgroundColor} text="Focus Background Color" />
						<ColorPicker color={context.popupBackgroundColor} colorHandler={handlePopupBackgroundColor} text="Pupup Background Color" />
						<ColorPicker color={context.subtitleTextColor} colorHandler={handleSubtitleTextColor} text="Subtitle Text Color" />
						<ColorPicker color={context.textColor} colorHandler={handleTextColor} text="Text Color" />
					</Scroller>
					<Button className={css.resetBtn} icon="trash" onClick={handleResetButton} size="small">Reset</Button>
				</Column>
			</Cell>
		</Layout>
	);
};

export default ColorCustomizationView;
