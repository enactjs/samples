import Button from '@enact/moonstone/Button';
import BodyText from '@enact/moonstone/BodyText';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Analytics Example" />
			<BodyText>
				This app is hooked in to @enact/analytics and outputs log entries
				to the console as a demonstration.
			</BodyText>
			<Button>Click me</Button>
		</Panel>
	)
});

export default MainPanel;
