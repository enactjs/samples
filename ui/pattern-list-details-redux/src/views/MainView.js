import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import React from 'react';

import NavContainer from '../containers/NavContainer';

import Body from './Body';

const MainView = kind({
	name: 'MainView',

	render: (props) => (
		<Panel {...props}>
			<Header type="compact">
				<title>City Viewer Redux</title>
				<NavContainer />
			</Header>
			<Body />
		</Panel>
	)
});

export default MainView;
