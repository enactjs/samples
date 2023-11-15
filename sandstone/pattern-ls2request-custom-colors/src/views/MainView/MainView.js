import IconItem from '@enact/sandstone/IconItem';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import {useCallback, useContext, useRef, useState} from 'react';

import ColorCustomizationView from '../ColorCustomizationView';
import PresetChoiceView from '../PresetChoiceView';
import ShowcaseView from '../ShowcaseView';

import {AppContext} from '../../constants';

const MainView = (rest) => {
	// Here we get the context of the app
	const {context} = useContext(AppContext);
	const [panelIndex, setPanelIndex] = useState(0);
	const lastPanelIndex = useRef(0);

	// Based on the lightMode variable from our context we determine the appropriate skin for our app
	const skin = context.lightMode ? 'light' : 'neutral';

	const navigate = useCallback((index) => {
		lastPanelIndex.current = panelIndex;
		setPanelIndex(index);
	}, [panelIndex]);

	const backward = useCallback(() => {
		console.log(lastPanelIndex)
		setPanelIndex(lastPanelIndex.current)
	}, [])

	return (
		<Panels
			{...rest}
			index={panelIndex}
			noCloseButton
			noBackButton
			skin={skin}
		>
			<Panel>
				<Header subtitle="Choose preset colors" title="Color Customization App" />
				<PresetChoiceView navigate={navigate} />
			</Panel>
			<Panel>
				<Header subtitle="Customize App Colors" title="Color Customization App" />
				<ColorCustomizationView navigate={navigate} />
			</Panel>
			<Panel>
				<Header subtitle="Showcase Panel" title="Color Customization App" >
					<slotBefore>
						<IconItem icon="arrowhookleft" onClick={backward} />
					</slotBefore>
				</Header>
				<ShowcaseView />
			</Panel>
		</Panels>
	);
};

export default MainView;
