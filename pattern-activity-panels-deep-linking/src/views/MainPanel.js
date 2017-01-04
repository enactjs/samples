import React from 'react';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import {Panel, Header} from '@enact/moonstone/Panels';

const MainPanel = kind({
	name: 'MainPanel',

	render: ({title, onClick}) => (
		<Panel>
			<Header title={title} />
			<Button onClick={onClick}>Click me</Button>
		</Panel>
	)
});

export default MainPanel;
