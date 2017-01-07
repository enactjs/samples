import React from 'react';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import Item from '@enact/moonstone/Item';
import {Panel, Header} from '@enact/moonstone/Panels';

const MainPanel = kind({
	name: 'MainPanel',

	render: (rest) => (
		<Panel {...rest}>
			<Header title="Channel Manager" />
		</Panel>
	)
});

export default MainPanel;
