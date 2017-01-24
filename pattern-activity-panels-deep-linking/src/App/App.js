import {ActivityPanels, Routable, Route} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';

import MainPanel from '../views/MainPanel';

import AppStateDecorator from './AppStateDecorator';

const RoutablePanels = Routable({navigate: 'onSelectBreadcrumb'}, ActivityPanels);

const App = kind({
	name: 'App',

	propTypes: {
		onNavigate: React.PropTypes.func,
		path: React.PropTypes.string
	},

	computed: {
		onSecondPanel: ({onNavigate}) => () => onNavigate({path: '/first/second'}),
		onThirdPanel: ({onNavigate}) => () => onNavigate({path: '/first/second/third'}),
		onFourthPanel: ({onNavigate}) => () => onNavigate({path: '/first/second/third/fourth'})
	},

	render: ({onFourthPanel, onNavigate, onSecondPanel, onThirdPanel, path, ...rest}) => {
		return (
			<RoutablePanels {...rest} onSelectBreadcrumb={onNavigate} path={path}>
				<Route path="first" component={MainPanel} title="First" onClick={onSecondPanel}>
					<Route path="second" component={MainPanel} title="Second" onClick={onThirdPanel}>
						<Route path="third" component={MainPanel} title="Third" onClick={onFourthPanel}>
							<Route path="fourth" component={MainPanel} title="Fourth" />
						</Route>
					</Route>
				</Route>
			</RoutablePanels>
		);
	}
});

export default MoonstoneDecorator(
	AppStateDecorator(
		App
	)
);
