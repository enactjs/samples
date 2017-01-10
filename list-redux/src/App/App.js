import React from 'react';
import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels, Routable, Route} from '@enact/moonstone/Panels';
import MainPanel from '../views/MainPanel';
import EditChannelPanel from '../views/EditChannelPanel';
import AppStateDecorator from './AppStateDecorator';

import css from './App.less';

const RoutablePanels = Routable({navigate: 'onSelectBreadcrumb'}, ActivityPanels);

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},
	computed: {
		onSecondPanel: ({onNavigate}) => () => onNavigate({path: '/first/second'}),
	},
	render: ({onNavigate, onSecondPanel, path, ...rest}) => (
		<RoutablePanels {...rest} onSelectBreadcrumb={onNavigate} path={path}>
			<Route path="first" component={MainPanel} title="First" onClick={onSecondPanel}>
				<Route path="second" component={EditChannelPanel} title="Second"/>
			</Route>
		</RoutablePanels>
	)
});

export default MoonstoneDecorator(
	AppStateDecorator(
		App
	)
);
