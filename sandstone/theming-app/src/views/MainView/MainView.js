import {useCallback, useState} from 'react';
import IconItem from '@enact/sandstone/IconItem';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';

import CustomizePanel from '../CustomizePanel';
import PresetPanel from '../PresetPanel';

import useLinearSkinColor from '../../hooks';

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
			skin={applySkin ? skin : 'neutral'}
			{...props}
			index={panelIndex}
			noCloseButton
			onBack={backward}
		>
			<Panel>
				<Header subtitle="Choose preset theme" title="Theming App">
					<slotAfter>
						<IconItem icon="arrowsmallright" label="Customize" onClick={forward} />
					</slotAfter>
				</Header>
				<PresetPanel />
			</Panel>
			<Panel>
				<Header subtitle="Customize theme" title="Theming App" />
				<CustomizePanel />
			</Panel>
		</Panels>
	);
};
export default MainView;
