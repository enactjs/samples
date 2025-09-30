import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/sandstone/Panels';
import React from 'react';

// Custom component
import Counter from '../components/Counter';
import Button from "@enact/sandstone/Button";

// Props for MainPanel
interface MainPanelProps {
	onClick?: () => void; // optional handler for navigation
}

const MainPanel = kind<MainPanelProps>({
	name: 'MainPanel',

	render: ({onClick, ...rest}) => (
		<Panel {...rest}>
			<Header title="Hello Enact + TypeScript!" />
			<Button onClick={onClick}>To First Panel</Button>
		</Panel>
	)
});

export default MainPanel;
