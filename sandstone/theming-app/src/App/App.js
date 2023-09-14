import IconItem from '@enact/sandstone/IconItem';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {useCallback, useState} from 'react';

import CustomizePanel from '../views/CustomizePanel';
import PresetPanel from '../views/PresetPanel';
import screenTypes from '../../screenTypes.json';

import useLinearSkinColor from '../hooks';

const App = (props) => {
	useLinearSkinColor();

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
	)
};

export default ThemeDecorator({ri: {screenTypes}}, App);
