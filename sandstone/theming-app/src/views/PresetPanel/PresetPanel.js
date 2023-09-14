import RadioItem from '@enact/sandstone/RadioItem';
import SwitchItem from '@enact/sandstone/SwitchItem';
import {Cell, Column, Layout} from '@enact/ui/Layout';

import PreviewSection from '../../components/PreviewSection';

import {presets} from '../../constants';

import css from './PresetPanel.module.less';

const PresetPanel = () => {
	return (
		<Layout className={css.presetPanel}>
			<Cell className={css.customizeSection} size="40%">
				<Column>
					{Object.keys(presets).map((key) =>
						<RadioItem key={key}>{key}</RadioItem>
					)}
					<SwitchItem>Activate dynamic color mode</SwitchItem>
					<SwitchItem>Adjust skin automatically</SwitchItem>
				</Column>
			</Cell>
			<PreviewSection />
		</Layout>
	);
};

export default PresetPanel;
