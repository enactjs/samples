import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';

import CoverFlow from '../components/CoverFlow';

const covers = [];
for (let i = 0; i < 50; i++) {
	const
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		source = `http://placehold.it/300x300/${color}/ffffff&text=Image ${i}`;
	covers.push({source});
}

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Hello CoverFlow!" />
			<CoverFlow
				data={covers}
				dataSize={covers.length}
			/>
		</Panel>
	)
});

export default MainPanel;
