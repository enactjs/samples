import {HashRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import {render} from 'react-dom';

import PatternActivityPanels from '../../pattern-activity-panels/src/App';
import PatternActivityPanelsDeepLinking from '../../pattern-activity-panels-deep-linking/src/main';
import PatternActivityPanelsRedux from '../../pattern-activity-panels-redux/src/main';
import PatternDynamicPanel from '../../pattern-dynamic-panel/src/App';
import PatternExpandableList from '../../pattern-expandablelist-object/src/App';
import PatternListDetails from '../../pattern-list-details/src/App';
import PatternListDetailsRedux from '../../pattern-list-details-redux/src/main';
import PatternLocaleSwitching from '../../pattern-locale-switching/src/main';
import PatternLs2request from '../../pattern-ls2request/src/main';
import PatternRoutablePanels from '../../pattern-routable-panels/src/main';
import PatternSinglePanel from '../../pattern-single-panel/src/App';
import PatternSinglePanelRedux from '../../pattern-single-panel-redux/src/main';
import PatternVirtualgridlistApi from '../../pattern-virtualgridlist-api/src/main';
import TutorialHelloEnact from '../../tutorial-hello-enact/src/App';
import TutorialKittenBrowser from '../../tutorial-kitten-browser/src/App';

import App from './App';
import ButtonToSamples from './components/ButtonToSamples';

export const routes = [
	{path: '/', exact: true, component: App},
	{path: '/PatternActivityPanels', component: PatternActivityPanels},
	{path: '/PatternActivityPanelsDeepLinking', component: PatternActivityPanelsDeepLinking},
	{path: '/PatternActivityPanelsRedux', component: PatternActivityPanelsRedux},
	{path: '/PatternDynamicPanel', component: PatternDynamicPanel},
	{path: '/PatternExpandableList', component: PatternExpandableList},
	{path: '/PatternListDetails', component: PatternListDetails},
	{path: '/PatternListDetailsRedux', component: PatternListDetailsRedux},
	{path: '/PatternLocaleSwitching', component: PatternLocaleSwitching},
	{path: '/PatternLs2request', component: PatternLs2request},
	{path: '/PatternRoutablePanels', component: PatternRoutablePanels},
	{path: '/PatternSinglePanel', component: PatternSinglePanel},
	{path: '/PatternSinglePanelRedux', component: PatternSinglePanelRedux},
	{path: '/PatternVirtualgridlistApi', component: PatternVirtualgridlistApi},
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
