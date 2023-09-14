import Button from '@enact/sandstone/Button';
import ColorPicker from '@enact/sandstone/ColorPicker';
import Scroller from '@enact/sandstone/Scroller';
import {Cell, Layout} from '@enact/ui/Layout';

import PreviewSection from '../../components/PreviewSection';

import css from './CustomizePanel.module.less';

import {useCallback, useContext} from 'react';
import {AppContext} from "../../constants";

const CustomizePanel = () => {
	const {backgroundColor, componentBackgroundColor, focusBackgroundColor, popupBackgroundColor, subtitleTextColor, textColor} = useContext(AppContext);

	const handleClick = useCallback(() => {

	}, []);

	return (
		<Layout className={css.customizePanel}>
			<Cell className={css.customizeSection} size="40%">
				<Layout align="stretch space-between" orientation="vertical">
					<Scroller>
						<ColorPicker color={backgroundColor} colorHandler={handleClick} text='Background Color'/>
						<ColorPicker color={componentBackgroundColor} colorHandler={handleClick} text='Component Background Color'/>
						<ColorPicker color={focusBackgroundColor} colorHandler={handleClick} text='Focus Background-Color'/>
						<ColorPicker color={popupBackgroundColor} colorHandler={handleClick} text='Pupup Background-Color'/>
						<ColorPicker color={subtitleTextColor} colorHandler={handleClick} text='Text Color'/>
						<ColorPicker color={textColor} colorHandler={handleClick} text='Subtitle Text Color'/>
					</Scroller>
					<Button className={css.resetBtn} icon="trash" size="small" tooltipText="Undo changes">Reset</Button>
				</Layout>
			</Cell>
			<PreviewSection />
		</Layout>
	);
};

export default CustomizePanel;
