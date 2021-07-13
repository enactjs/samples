import 'web-animations-js';
import {HashRouter as Router, Route} from 'react-router-dom';
import {render} from 'react-dom';

import PatternDynamicPanel from '../../pattern-dynamic-panel/src/App/App';
import PatternLayout from '../../pattern-layout/src/App/App';
import PatternLocaleSwitching from '../../pattern-locale-switching/src/main';
import PatternRoutablePanels from '../../pattern-routable-panels/src/main';
import PatternSinglePanel from '../../pattern-single-panel/src/App/App';
import PatternSinglePanelRedux from '../../pattern-single-panel-redux/src/main';
import PatternVideoPlayer from '../../pattern-video-player/src/App/App';
import PatternVirtualgridlistApi from '../../pattern-virtualgridlist-api/src/main';
import PatternVirtuallistPreservingFocus from '../../pattern-virtuallist-preserving-focus/src/main';
import TutorialHelloEnact from '../../../tutorial-hello-enact/src/App/App';
import TutorialKittenBrowser from '../../../tutorial-kitten-browser/src/App/App';

import App from './App';
import ButtonToSamples from './components/ButtonToSamples';

export const routes = [
	{path: '/', exact: true, component: App},
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

// Router causes an error with our samples, but we don't want our samples to know about router.
// To avoid this for now we're just surpressing the error.
/* eslint-disable no-console */
const originalConsoleError = console.error;

console.error = (...args) => {
	return args[0].includes('React does not recognize the `staticContext` prop on a DOM element.') || args[0].includes('Unknown props `match`, `location`, `history`, `staticContext`') || args[0].includes('Warning: Hash history cannot PUSH the same path') ? null : originalConsoleError(args.join(' '));
};
/* eslint-enable no-console */

const appElement = (
	<Router>
		<div>
			<ButtonToSamples />
			{routes.map((route, index) => <Route key={index} {...route} />)}
		</div>
	</Router>
);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
