import React from 'react';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import Item from '@enact/moonstone/Item';

const MainPanel = kind({
	name: 'MainPanel',
	computed: {
		navigate: ({onNavigate}) => () => onNavigate({index: 1})
	},
	render: ({navigate, ...rest}) => (
		<Panel {...rest}>
			<Header title="Channel Manager" />
			<Item onClick={navigate}>Edit All Channels</Item>
		</Panel>
	)
});

export default MainPanel;
