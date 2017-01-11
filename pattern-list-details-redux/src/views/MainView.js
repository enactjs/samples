import React from 'react';
import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/moonstone/Panels';
import Body from './Body';
import NavContainer from '../containers/NavContainer';

const MainView = kind({
	name: 'MainView',

	render: () => (
		<Panel>
			<Header title="City Viewer" type="compact" />
			<NavContainer />
			<Body />
		</Panel>
	)
});

export default MainView;
