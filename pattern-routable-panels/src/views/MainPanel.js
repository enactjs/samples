import React from 'react';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import {Panel, Header} from '@enact/moonstone/Panels';

import RouteTree from './RouteTree';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		next: React.PropTypes.string,
		onClick: React.PropTypes.func,
		title: React.PropTypes.string
	},

	computed: {
		text: ({next}) => `To ${next} Panel`
	},

	render: ({title, onClick, text}) => (
		<Panel>
			<Header title={title} />
			<RouteTree />
			<Button onClick={onClick}>{text}</Button>
		</Panel>
	)
});

export default MainPanel;
