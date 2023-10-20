import {useCallback, useContext} from 'react';
import Button from '@enact/sandstone/Button';
import Scroller from '@enact/sandstone/Scroller';
import {Cell, Layout} from '@enact/ui/Layout';

import {setPreset, changeSettings} from '../../hooks/utils';
import {generateStylesheet} from '../../hooks/generateStylesheet';
import ColorPicker from '../../components/ColorPicker';
import PreviewSection from '../../components/PreviewSection';
import {AppContext} from '../../constants';

import css from './CustomizePanel.module.less';

const CustomizePanel = () => {
	const {context, setContext} = useContext(AppContext);
	const {backgroundColor, componentBackgroundColor, focusBackgroundColor, popupBackgroundColor, subtitleTextColor, textColor} = context;

	const onChangeColor = useCallback((color, newColor) => {
		// a copy of the context object is created
		const newContext = Object.assign({}, context);
		// update the color value on the newly created object with what gets received from `event` (handleBackgroundColor)
		newContext[color] = newColor;
		// generate the new stylesheet based on the updated color
		newContext.colors = generateStylesheet(
			newContext.backgroundColor,
			newContext.componentBackgroundColor,
			newContext.focusBackgroundColor,
			newContext.popupBackgroundColor,
			newContext.subtitleTextColor,
			newContext.textColor,
			newContext.preset
		);
		// update the app context with the new context
		setContext(newContext);

		// check if app is running on webOS environment and update the `theme`
		if (typeof window === 'object' && window.webOSSystem && window.webOSSystem.launchParams) {
			changeSettings({
				category: 'customUi',
				settings: {
					theme: JSON.stringify(newContext)
				}
			});
		}
	}, [context, setContext]);

	const handleBackgroundColor = useCallback((ev) => {
		onChangeColor('backgroundColor', ev);
	}, [onChangeColor]);

	const handleComponentBackgroundColor = useCallback((ev) => {
		onChangeColor('componentBackgroundColor', ev);
	}, [onChangeColor]);

	const handleFocusBackgroundColor = useCallback((ev) => {
		onChangeColor('focusBackgroundColor', ev);
	}, [onChangeColor]);

	const handlePopupBackgroundColor = useCallback((ev) => {
		onChangeColor('popupBackgroundColor', ev);
	}, [onChangeColor]);

	const handleSubtitleTextColor = useCallback((ev) => {
		onChangeColor('subtitleTextColor', ev);
	}, [onChangeColor]);

	const handleTextColor = useCallback((ev) => {
		onChangeColor('textColor', ev);
	}, [onChangeColor]);

	const handleResetButton = useCallback(() => {
		const newContext = setPreset({preset: context.activeTheme, context});
		setContext(newContext);

		if (typeof window === 'object' && window.webOSSystem && window.webOSSystem.launchParams) {
			changeSettings({
				category: 'customUi',
				settings: {
					theme: JSON.stringify(newContext)
				}
			});
		}
	}, [context, setContext]);

	return (
		<Layout className={css.customizePanel}>
			<Cell className={css.customizeSection} size="40%">
				<Layout align="stretch space-between" orientation="vertical">
					<Scroller className={css.scroller}>
						<ColorPicker className={css.colorPicker} color={backgroundColor} colorHandler={handleBackgroundColor} text="Background Color" />
						<ColorPicker className={css.colorPicker} color={componentBackgroundColor} colorHandler={handleComponentBackgroundColor} text="Component Background Color" />
						<ColorPicker className={css.colorPicker} color={focusBackgroundColor} colorHandler={handleFocusBackgroundColor} text="Focus Background Color" />
						<ColorPicker className={css.colorPicker} color={popupBackgroundColor} colorHandler={handlePopupBackgroundColor} text="Pupup Background Color" />
						<ColorPicker className={css.colorPicker} color={subtitleTextColor} colorHandler={handleSubtitleTextColor} text="Subtitle Text Color" />
						<ColorPicker className={css.colorPicker} color={textColor} colorHandler={handleTextColor} text="Text Color" />
					</Scroller>
					<Button className={css.resetBtn} icon="trash" onClick={handleResetButton} size="small">Reset</Button>
				</Layout>
			</Cell>
			<PreviewSection />
		</Layout>
	);
};

export default CustomizePanel;
