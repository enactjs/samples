import React from 'react';
import kind from '@enact/core/kind';
import Body from './Body';
import HeadContainer from '../container-components/HeadContainer';

const MainView = kind({
	name: 'MainView',

	render: () => (
		<div>
			<HeadContainer />
			<Body />
		</div>
	)
});

export default MainView;
