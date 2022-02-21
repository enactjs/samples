import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import Scroller from '@enact/moonstone/Scroller';
import PropTypes from 'prop-types';
import {HashRouter as Router, Route} from 'react-router-dom';

import SampleItem from '../components/SampleItem';
import ButtonToSamples from '../components/ButtonToSamples';
import {AppBase as PatternActivityPanels} from '../../../pattern-activity-panels/src/App/App';
import {appElementBase as PatternActivityPanelsDeepLinking} from '../../../pattern-activity-panels-deep-linking/src/main';
import {appElementBase as PatternActivityPanelsRedux} from '../../../pattern-activity-panels-redux/src/main';
import {AppBase as PatternDynamicPanel} from '../../../pattern-dynamic-panel/src/App/App';
import {AppBase as PatternExpandableList} from '../../../pattern-expandablelist-object/src/App/App';
import {AppBase as PatternLayout} from '../../../pattern-layout/src/App/App';
import {appElementBase as PatternLocaleSwitching} from '../../../pattern-locale-switching/src/main';
import {appElementBase as PatternRoutablePanels} from '../../../pattern-routable-panels/src/main';
import {AppBase as PatternSinglePanel} from '../../../pattern-single-panel/src/App/App';
import {appElementBase as PatternSinglePanelRedux} from '../../../pattern-single-panel-redux/src/main';
import {AppBase as PatternVideoPlayer} from '../../../pattern-video-player/src/App/App';
import {appElementBase as PatternVirtualgridlistApi} from '../../../pattern-virtualgridlist-api/src/main';
import {appElementBase as PatternVirtuallistPreservingFocus} from '../../../pattern-virtuallist-preserving-focus/src/main';


import css from './App.module.less';

const NavigationMenu = kind({
	name: 'NavigationMenu',

	propTypes: {
		history: PropTypes.object,
		location: PropTypes.any,
		match: PropTypes.any,
		staticContext: PropTypes.any
	},

	render: ({history, ...props}) => {
		delete props.match;
		delete props.location;
		delete props.staticContext;

		return (
			<div {...props} style={{height: '90%'}}>
				<Scroller>
					{
						// eslint-disable-next-line no-use-before-define
						routes.map(({path}, index) => {
							if (path !== '/') {
								return (
									<SampleItem key={index} path={path} history={history}>
										{path.substr(1)}
									</SampleItem>
								);
							}
							return null;
						})
					}
				</Scroller>
			</div>
		);
	}
});

const routes = [
	{path: '/', exact: true, component: NavigationMenu},
	{path: '/PatternActivityPanels', component: PatternActivityPanels},
	{path: '/PatternActivityPanelsDeepLinking', component: PatternActivityPanelsDeepLinking},
	{path: '/PatternActivityPanelsRedux', component: PatternActivityPanelsRedux},
	{path: '/PatternDynamicPanel', component: PatternDynamicPanel},
	{path: '/PatternExpandableList', component: PatternExpandableList},
	{path: '/PatternLayout', component: PatternLayout},
	{path: '/PatternLocaleSwitching', component: PatternLocaleSwitching},
	{path: '/PatternRoutablePanels', component: PatternRoutablePanels},
	{path: '/PatternSinglePanel', component: PatternSinglePanel},
	{path: '/PatternSinglePanelRedux', component: PatternSinglePanelRedux},
	{path: '/PatternVideoPlayer', component: PatternVideoPlayer},
	{path: '/PatternVirtualgridlistApi', component: PatternVirtualgridlistApi},
	{path: '/PatternVirtuallistPreservingFocus', component: PatternVirtuallistPreservingFocus}
];

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<Router>
			<div {...props}>
				<ButtonToSamples />
				{routes.map((route, index) => <Route key={index} {...route} />)}
			</div>
		</Router>
	)
});

export default MoonstoneDecorator(App);
