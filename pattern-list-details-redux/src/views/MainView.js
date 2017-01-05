import React from 'react';
import kind from '@enact/core/kind';
import {Header} from '@enact/moonstone/Panels';
import Body from './Body';
import NavContainer from '../containers/NavContainer';

const MainView = kind({
	name: 'MainView',

	render: () => (
		<div>
			<Header title="City Viewer" type="compact" />
			<NavContainer />
			<Body />
		</div>
	)
});

export default MainView;
