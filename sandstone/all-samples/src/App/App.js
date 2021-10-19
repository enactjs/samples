import kind from '@enact/core/kind';
import Scroller from '@enact/sandstone/Scroller';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import PropTypes from 'prop-types';
import {HashRouter as Router, Route} from 'react-router-dom';

import SampleItem from '../components/SampleItem';
import ButtonToSamples from '../components/ButtonToSamples';
import {AppBase as PatternDynamicPanel} from '../../../pattern-dynamic-panel/src/App/App';
import {AppBase as PatternLayout} from '../../../pattern-layout/src/App/App';
import {appElementBase as PatternLocaleSwitching} from '../../../pattern-locale-switching/src/main';
import {appElementBase as PatternRoutablePanels} from '../../../pattern-routable-panels/src/main';
import {AppBase as PatternSinglePanel} from '../../../pattern-single-panel/src/App/App';
import {appElementBase as PatternSinglePanelRedux} from '../../../pattern-single-panel-redux/src/main';
import {AppBase as PatternVideoPlayer} from '../../../pattern-video-player/src/App/App';
import {appElementBase as PatternVirtualgridlistApi} from '../../../pattern-virtualgridlist-api/src/main';
import {appElementBase as PatternVirtuallistPreservingFocus} from '../../../pattern-virtuallist-preserving-focus/src/main';
import {AppBase as TutorialHelloEnact} from '../../../tutorial-hello-enact/src/App/App';
import {AppBase as TutorialKittenBrowser} from '../../../tutorial-kitten-browser/src/App/App';

import css from './App.module.less';

const NavigationMenu = kind({
	name: 'App',

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
	{path: '/PatternDynamicPanel', component: PatternDynamicPanel},
	{path: '/PatternLayout', component: PatternLayout},
	{path: '/PatternLocaleSwitching', component: PatternLocaleSwitching},
	{path: '/PatternRoutablePanels', component: PatternRoutablePanels},
	{path: '/PatternSinglePanel', component: PatternSinglePanel},
	{path: '/PatternSinglePanelRedux', component: PatternSinglePanelRedux},
	{path: '/PatternVideoPlayer', component: PatternVideoPlayer},
	{path: '/PatternVirtualgridlistApi', component: PatternVirtualgridlistApi},
	{path: '/PatternVirtuallistPreservingFocus', component: PatternVirtuallistPreservingFocus},
	{path: '/TutorialHelloEnact', component: TutorialHelloEnact},
	{path: '/TutorialKittenBrowser', component: TutorialKittenBrowser}
];

const AppBase = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => {
		return (
			<Router>
				<div {...props}>
					<ButtonToSamples />
					{routes.map((route, index) => <Route key={index} {...route} />)}
				</div>
			</Router>
		);
	}
});

const App = ThemeDecorator(AppBase);
export default App;
