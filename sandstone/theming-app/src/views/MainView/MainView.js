import {useCallback, useState} from 'react';
import IconItem from '@enact/sandstone/IconItem';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';

import CustomizePanel from '../CustomizePanel';
import PresetPanel from '../PresetPanel';

import useLinearSkinColor from '../../hooks';

import css from './MainView.module.less';

const MainView = (props) => {
	const [applySkin, skin] = useLinearSkinColor();

	const [panelIndex, setState] = useState(0);

	const forward = useCallback(() => {
		setState(panelIndex + 1);
	}, [panelIndex]);

	const backward = useCallback(() => {
		setState(panelIndex - 1);
	}, [panelIndex]);

	return (
		<Panels
			{...props}
			className={css.mainView}
			index={panelIndex}
			noCloseButton
			onBack={backward}
			skin={applySkin ? skin : 'neutral'}
		>
			<Panel>
				<Header className={css.panelHeader} subtitle="Choose preset theme" title="Theming App">
					<slotAfter>
						<IconItem icon="arrowsmallright" label="Customize" onClick={forward} />
					</slotAfter>
				</Header>
				<PresetPanel />
			</Panel>
			<Panel>
				<Header className={css.panelHeader} subtitle="Customize theme" title="Theming App" />
				<CustomizePanel />
			</Panel>
		</Panels>
	);
};
export default MainView;
