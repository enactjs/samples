import IconItem from '@enact/sandstone/IconItem';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import Spinner from '@enact/sandstone/Spinner';
import {platform} from '@enact/webos/platform';
import {useCallback, useEffect, useState} from 'react';

import CustomizePanel from '../CustomizePanel';
import PresetPanel from '../PresetPanel';

import useLinearSkinColor from '../../hooks';
import {getSettings} from '../../hooks/utils';

import css from './MainView.module.less';

const MainView = (props) => {
	const [applySkin, skin] = useLinearSkinColor();
	const [panelIndex, setPanelIndex] = useState(0);

	// when running on webOS system, wait for `theme` key data to be available, then render the view
	const isWebOSPlatform = platform.tv;
	const [loading, setLoading] = useState(!!isWebOSPlatform);

	useEffect(() => {
		if (isWebOSPlatform) {
			getSettings({
				category: 'customUi',
				keys: ['theme']
			}).then(res => {
				if (res.returnValue) setLoading(false);
			});
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const forward = useCallback(() => {
		setPanelIndex(panelIndex + 1);
	}, [panelIndex]);

	const backward = useCallback(() => {
		setPanelIndex(panelIndex - 1);
	}, [panelIndex]);

	if (loading) {
		return <Spinner centered>Loading...</Spinner>
	} else {
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
	}
};
export default MainView;
