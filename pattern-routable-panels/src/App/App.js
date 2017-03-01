import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {Panels, Routable, Route} from '@enact/moonstone/Panels';
import React from 'react';
import {SlideLeftArranger} from '@enact/ui/ViewManager';

import AboutPanel from '../views/AboutPanel';
import MainPanel from '../views/MainPanel';

import AppStateDecorator from './AppStateDecorator';

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);

const App = kind({
	name: 'App',

	propTypes: {
		onNavigate: React.PropTypes.func,
		path: React.PropTypes.string
	},

	computed: {
		routes: ({path, onNavigate}) => {
			let parents = path.split('/');
			let child;

			while (parents.length > 2) {
				let part = parents.pop();
				child = <Route
					component={MainPanel}
					path={part}
					title={part}
					onPath={onNavigate}
					parents={parents.join('/')}
				>
					{child}
				</Route>;
			}
			return (<Route
				component={AboutPanel}
				path={`${parents[1]}`}
				title="About Dynamic Routable Panels"
				onPath={onNavigate}
			>
				{child}
			</Route>);
		}
	},

	/*
	handlers: {
		onFirstPanel: (ev, {onNavigate}) => onNavigate({path: '/first'}),
		onSecondPanel: (ev, {onNavigate}) => onNavigate({path: '/first/second'}),
		onThirdPanel: (ev, {onNavigate}) => onNavigate({path: '/first/third'}),
		onFourthPanel: (ev, {onNavigate}) => onNavigate({path: '/first/third/fourth'})
	},
	*/

	render: ({routes, onNavigate, path, ...rest}) => {
		return (
			<RoutablePanels {...rest} arranger={SlideLeftArranger} onBack={onNavigate} path={path}>
				{routes}
			</RoutablePanels>
		);
	}
});

export default MoonstoneDecorator(
	AppStateDecorator(
		App
	)
);
