import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import React from 'react';

import NavContainer from '../containers/NavContainer';

import css from './Body.less';
import Body from './Body';

const MainView = kind({
	name: 'MainView',

	render: (props) => (
		<Panel {...props}>
			<Header title="City Viewer" type="compact" />
			<div className={css.panelBody}>
				<NavContainer />
				<Body />
			</div>
		</Panel>
	)
});

export default MainView;
