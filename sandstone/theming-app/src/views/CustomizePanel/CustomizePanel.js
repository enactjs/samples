import Button from '@enact/sandstone/Button';
import {InputField} from '@enact/sandstone/Input';
import {Cell, Layout} from '@enact/ui/Layout';

import PreviewSection from '../../components/PreviewSection';

import css from './CustomizePanel.module.less';

const CustomizePanel = () => {
	return (
		<Layout className={css.customizePanel}>
			<Cell className={css.customizeSection} size="40%">
				<Layout align="stretch space-between" orientation="vertical">
					<InputField placeholder="Background-color"/>
					<Button className={css.resetBtn} icon="trash" size="small" tooltipText="Undo changes">Reset</Button>
				</Layout>
			</Cell>
			<PreviewSection />
		</Layout>
	);
};

export default CustomizePanel;
