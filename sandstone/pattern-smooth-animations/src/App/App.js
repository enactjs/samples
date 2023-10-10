import IconItem from '@enact/sandstone/IconItem';
import {Header, Panel, Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {useCallback, useState} from 'react';

import AnimateDisplay from '../views/AnimateDisplay';
import OverlayProperty from '../views/OverlayProperty';
import SandstonePopup from '../views/SandstonePopup';
import StartingStyleRule from '../views/StartingStyleRule';
import TransitionBehavior from '../views/TransitionBehavior';

const App = (props) => {
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
				<Header subtitle="Animate CSS Display property" title="Smooth extry/exit Animations">
					<slotAfter>
						<IconItem icon="arrowsmallright" label="Next" onClick={forward} />
					</slotAfter>
				</Header>
				<AnimateDisplay />
			</Panel>
			<Panel>
				<Header subtitle="Transition Behavior CSS property" title="Smooth extry/exit Animations">
					<slotAfter>
						<IconItem icon="arrowsmallright" label="Next" onClick={forward} />
					</slotAfter>
				</Header>
				<TransitionBehavior />
			</Panel>
			<Panel>
				<Header subtitle="Starting Style rule" title="Smooth extry/exit Animations">
					<slotAfter>
						<IconItem icon="arrowsmallright" label="Next" onClick={forward} />
					</slotAfter>
				</Header>
				<StartingStyleRule />
			</Panel>
			<Panel>
				<Header subtitle="Overlay property" title="Smooth extry/exit Animations">
					<slotAfter>
						<IconItem icon="arrowsmallright" label="Next" onClick={forward} />
					</slotAfter>
				</Header>
				<OverlayProperty />
			</Panel>
			<Panel>
				<Header subtitle="New CSS features on Sandstone Popup" title="Smooth extry/exit Animations" />
				<SandstonePopup />
			</Panel>
		</Panels>
	);
};

export default ThemeDecorator(App);
