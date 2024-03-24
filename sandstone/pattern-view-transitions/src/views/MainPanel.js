import Dropdown from '@enact/sandstone/Dropdown';
import Panels, {Header, Panel} from '@enact/sandstone/Panels';
import {useCallback, useMemo, useState} from 'react';
import FixedPopupPanelsWithTransition from '../components/FixedPopupPanles';
import PanelsViewTransition from "../components/Panels";
import PopupWithTransition from '../components/Popup';
import QuickGuidePanelsWithTransition from '../components/QuickGuidePanels';
import WizardPanelsWithTransition from '../components/WizardPanles';

const MainPanel = ({...props}) => {
	const [index, setIndex] = useState(0);
	const [selectedTransition, setSelectedTransition] = useState('No transition');
	const [selectedComponent, setSelectedComponent] = useState('FixedPopupPanels');

	const components = useMemo(() => ['FixedPopupPanels', 'Panels', 'Popup', 'QuickGuidePanels', 'WizardPanels'], []);

	const panelsTransitions = useMemo(() => ['No transition', 'Dissolve', 'Rotate', 'Swipe', 'Zoom In', 'Zoom Swipe'], []);
	const quickGuideTransitions = useMemo(() => ['No transition', 'Dissolve', 'Swipe', 'Zoom In', 'Zoom Swipe'], []);
	const popupTransitions = useMemo(() => ['No transition', 'Dissolve', 'Zoom In'], []);

	const handleOnSelectTransition = useCallback((ev) => setSelectedTransition(ev.data), []);
	const handleOnSelectComponent = useCallback((ev) => {
		setSelectedComponent(ev.data);
		setSelectedTransition('No transition');
		setIndex(components.findIndex((value) => value === ev.data));
	}, [components]);

	return (
		<Panels index={index}>
			<Panel>
				<Header
					centered
					noBackButton
					noCloseButton
					style={{backgroundColor: '#383838'}}
					subtitle="Dissolve transition"
					title="FixedPopupPanels Component"
					type="mini"
				>
					<Dropdown
						defaultValue={0}
						onSelect={handleOnSelectComponent}
						placeholder="Component"
						selected={components.findIndex(value => value === selectedComponent)}
					>{components}
					</Dropdown>
				</Header>
				<FixedPopupPanelsWithTransition {...props} />
			</Panel>
			<Panel {...props}>
				<Header
					centered
					noBackButton
					noCloseButton
					style={{backgroundColor: '#383838'}}
					title="Panels Component"
					type="mini"
				>
					<Dropdown
						defaultValue={0}
						onSelect={handleOnSelectComponent}
						placeholder="Component"
						selected={components.findIndex(value => value === selectedComponent)}
					>{components}
					</Dropdown>
					<Dropdown
						defaultValue={0}
						onSelect={handleOnSelectTransition}
						placeholder="Transition type"
						selected={panelsTransitions.findIndex(value => value === selectedTransition)}
					>{panelsTransitions}
					</Dropdown>
				</Header>
				<PanelsViewTransition selectedTransition={selectedTransition} {...props} />
			</Panel>
			<Panel>
				<Header
					centered
					noBackButton
					noCloseButton
					subtitle="Dissolve transition"
					style={{backgroundColor: '#383838'}}
					title="Popup Component"
					type="mini"
				>
					<Dropdown
						defaultValue={0}
						onSelect={handleOnSelectComponent}
						placeholder="Component"
						selected={components.findIndex(value => value === selectedComponent)}
					>{components}
					</Dropdown>
					<Dropdown
						defaultValue={0}
						onSelect={handleOnSelectTransition}
						placeholder="Transition type"
						selected={popupTransitions.findIndex(value => value === selectedTransition)}
					>{popupTransitions}
					</Dropdown>
				</Header>
				<PopupWithTransition selectedTransition={selectedTransition} {...props} />
			</Panel>
			<Panel>
				<Header
					centered
					noBackButton
					noCloseButton
					style={{backgroundColor: '#383838'}}
					title="QuickGuidePanels Component"
					type="mini"
				>
					<Dropdown
						defaultValue={0}
						onSelect={handleOnSelectComponent}
						placeholder="Component"
						selected={components.findIndex(value => value === selectedComponent)}
					>{components}
					</Dropdown>
					<Dropdown
						defaultValue={0}
						onSelect={handleOnSelectTransition}
						placeholder="Transition type"
						selected={quickGuideTransitions.findIndex(value => value === selectedTransition)}
					>{quickGuideTransitions}
					</Dropdown>
				</Header>
				<QuickGuidePanelsWithTransition selectedTransition={selectedTransition} {...props} />
			</Panel>
			<Panel>
				<Header
					centered
					noBackButton
					noCloseButton
					style={{backgroundColor: '#383838'}}
					subtitle="Dissolve transition"
					title="WizardPanels Component"
					type="mini"
				>
					<Dropdown
						defaultValue={0}
						onSelect={handleOnSelectComponent}
						placeholder="Component"
						selected={components.findIndex(value => value === selectedComponent)}
					>{components}
					</Dropdown>
					<Dropdown
						defaultValue={0}
						onSelect={handleOnSelectTransition}
						placeholder="Transition type"
						selected={panelsTransitions.findIndex(value => value === selectedTransition)}
					>{panelsTransitions}
					</Dropdown>
				</Header>
				<WizardPanelsWithTransition selectedTransition={selectedTransition} {...props} />
			</Panel>
		</Panels>
	);
};

export default MainPanel;
