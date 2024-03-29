/* global ENACT_PACK_ISOMORPHIC */
import {createRoot, hydrateRoot} from 'react-dom/client';

import App from './App';

// Router causes an error with our samples, but we don't want our samples to know about router.
// To avoid this for now we're just suppressing the error.
/* eslint-disable no-console */
const originalConsoleError = console.error;

console.error = (...args) => {
	return (args[0].includes('React does not recognize the `%s` prop on a DOM element.') && args[1] === 'staticContext') || args[0].includes('Unknown props `match`, `location`, `history`, `staticContext`') || args[0].includes('Warning: Hash history cannot PUSH the same path') ? null : originalConsoleError(...args);
};
/* eslint-enable no-console */

const appElement = (<App />);

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
