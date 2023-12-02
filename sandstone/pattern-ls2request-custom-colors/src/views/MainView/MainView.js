import IconItem from '@enact/sandstone/IconItem';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import Spinner from '@enact/sandstone/Spinner';
import {useCallback, useState} from 'react';

import CustomizePanel from '../CustomizePanel';
import PresetPanel from '../PresetPanel';

import useLinearSkinColor from '../../hooks/useDynamicColor';

import css from './MainView.module.less';

const MainView = ({responseStatus, ...rest}) => {
	const [applySkin, skin] = useLinearSkinColor();
	const [panelIndex, setPanelIndex] = useState(0);

	const forward = useCallback(() => {
		setPanelIndex(panelIndex + 1);
	}, [panelIndex]);

	const backward = useCallback(() => {
		setPanelIndex(panelIndex - 1);
	}, [panelIndex]);

	if (!responseStatus && typeof window === 'object' && window.webOSSystem && window.webOSSystem.launchParams) {
		return (<Spinner centered>Loading...</Spinner>);
	} else {
		return (
			<Panels
				{...rest}
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
	}
};
export default MainView;
