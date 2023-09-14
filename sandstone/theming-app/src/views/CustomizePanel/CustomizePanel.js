import Button from '@enact/sandstone/Button';
import ColorPicker from '@enact/sandstone/ColorPicker';
import Scroller from '@enact/sandstone/Scroller';
import {Cell, Layout} from '@enact/ui/Layout';

import PreviewSection from '../../components/PreviewSection';

import css from './CustomizePanel.module.less';

const CustomizePanel = () => {
	return (
		<Layout className={css.customizePanel}>
			<Cell className={css.customizeSection} size="40%">
				<Layout align="stretch space-between" orientation="vertical">
					<Scroller>
						<ColorPicker color='red' colorHandler={(ev) => {console.log(ev)}} text='Background Color'/>
						<ColorPicker color='red' colorHandler={() => {}} text='Component Background Color'/>
						<ColorPicker color='red' colorHandler={() => {}} text='Focus Background-Color'/>
						<ColorPicker color='red' colorHandler={() => {}} text='Pupup Background-Color'/>
						<ColorPicker color='red' colorHandler={() => {}} text='Text Color'/>
						<ColorPicker color='red' colorHandler={() => {}} text='Subtitle Text Color'/>
					</Scroller>
					<Button className={css.resetBtn} icon="trash" size="small" tooltipText="Undo changes">Reset</Button>
				</Layout>
			</Cell>
			<PreviewSection />
		</Layout>
	);
};

export default CustomizePanel;
