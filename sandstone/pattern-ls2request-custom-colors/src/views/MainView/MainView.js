import IconItem from '@enact/sandstone/IconItem';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import {useCallback, useContext, useState} from 'react';

import ColorCustomizationView from '../ColorCustomizationView';
import PresetChoiceView from '../PresetChoiceView';
import ShowcaseView from '../ShowcaseView';

import {AppContext} from '../../constants';

const MainView = (rest) => {
	// Here we get the context of the app
	const {context} = useContext(AppContext);
	const [panelIndex, setPanelIndex] = useState(0);

	// Based on the lightMode variable from our context we determine the appropriate skin for our app
	const skin = context.lightMode ? 'light' : 'neutral';

	const forward = useCallback(() => {
		setPanelIndex(panelIndex + 1);
	}, [panelIndex]);

	const backward = useCallback(() => {
		setPanelIndex(panelIndex - 1);
	}, [panelIndex]);

	return (
		<Panels
			{...rest}
			index={panelIndex}
			noCloseButton
			onBack={backward}
			skin={skin}
		>
			<Panel>
				<Header subtitle="Choose preset colors" title="Color Customization App">
					<slotAfter>
						<IconItem icon="arrowsmallright" label="Customize Colors" onClick={forward} />
					</slotAfter>
				</Header>
				<PresetChoiceView />
			</Panel>
			<Panel>
				<Header subtitle="Customize App Colors" title="Color Customization App">
					<slotAfter>
						<IconItem icon="arrowsmallright" label="Showcase Panel" onClick={forward} />
					</slotAfter>
				</Header>
				<ColorCustomizationView />
			</Panel>
			<Panel>
				<Header subtitle="Showcase Panel" title="Color Customization App" />
				<ShowcaseView />
			</Panel>
		</Panels>
	);
};

export default MainView;
