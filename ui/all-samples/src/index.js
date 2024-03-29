/* global ENACT_PACK_ISOMORPHIC */
import {HashRouter, Route, Routes} from 'react-router-dom';
import {StaticRouter} from 'react-router-dom/server';
import {createRoot, hydrateRoot} from 'react-dom/client';

import PatternListDetails from '../../pattern-list-details/src/App';
import PatternListDetailsRedux from '../../pattern-list-details-redux/src/main';
import PatternLs2request from '../../pattern-ls2request/src/main';

import App from './App';
import ButtonToSamples from './components/ButtonToSamples';

export const routes = [
	{path: '/', exact: true, element: <App />},
	{path: '/PatternListDetails', element: <PatternListDetails />},
	{path: '/PatternListDetailsRedux', element: <PatternListDetailsRedux />},
	{path: '/PatternLs2request', element: <PatternLs2request />}
];

// Router causes an error with our samples, but we don't want our samples to know about router.
// To avoid this for now we're just surpressing the error.
/* eslint-disable no-console */
const originalConsoleError = console.error;

console.error = (...args) => {
	return args[0].includes('React does not recognize the `staticContext` prop on a DOM element.') || args[0].includes('Unknown props `match`, `location`, `history`, `staticContext`') || args[0].includes('Warning: Hash history cannot PUSH the same path') ? null : originalConsoleError(args.join(' '));
};
/* eslint-enable no-console */

const Router = typeof window !== 'undefined' ? HashRouter : StaticRouter;

const appElement = (
	<Router>
		<div>
			<ButtonToSamples />
			<Routes>
				{routes.map((route, index) => <Route key={index} {...route} />)}
			</Routes>
		</div>
	</Router>
);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	const container = document.getElementById('root');

	if (ENACT_PACK_ISOMORPHIC) {
		hydrateRoot(container, appElement);
	} else {
		createRoot(container).render(appElement);
	}
}

export default appElement;
