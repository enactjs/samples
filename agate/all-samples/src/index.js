import 'web-animations-js';
import {HashRouter as Router, Route} from 'react-router-dom';
import {render} from 'react-dom';

import PatternDynamicPanel from '../../pattern-dynamic-panel/src/App/App';
import PatternLayout from '../../pattern-layout/src/App/App';
import PatternLocaleSwitching from '../../pattern-locale-switching/src/main';
import PatternSinglePanel from '../../pattern-single-panel/src/App/App';
import PatternSinglePanelRedux from '../../pattern-single-panel-redux/src/main';
import PatternVirtualgridlistApi from '../../pattern-virtualgridlist-api/src/main';
import PatternVirtuallistPreservingFocus from '../../pattern-virtuallist-preserving-focus/src/main';

import App from './App';
import ButtonToSamples from './components/ButtonToSamples';

export const routes = [
	{path: '/', exact: true, component: App},
	{path: '/PatternDynamicPanel', component: PatternDynamicPanel},
	{path: '/PatternLayout', component: PatternLayout},
	{path: '/PatternLocaleSwitching', component: PatternLocaleSwitching},
	{path: '/PatternSinglePanel', component: PatternSinglePanel},
	{path: '/PatternSinglePanelRedux', component: PatternSinglePanelRedux},
	{path: '/PatternVirtualgridlistApi', component: PatternVirtualgridlistApi},
	{path: '/PatternVirtuallistPreservingFocus', component: PatternVirtuallistPreservingFocus}
];

// Router causes an error with our samples, but we don't want our samples to know about router.
// To avoid this for now we're just surpressing the error.
/* eslint-disable no-console */
const originalConsoleError = console.error;

console.error = (...args) => {
	return (args[0].includes('React does not recognize the `%s` prop on a DOM element.') && args[1] === 'staticContext') || args[0].includes('Unknown props `match`, `location`, `history`, `staticContext`') || args[0].includes('Warning: Hash history cannot PUSH the same path') ? null : originalConsoleError(...args);
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
