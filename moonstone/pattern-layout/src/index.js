/* eslint-disable react/jsx-no-bind */
/* global ENACT_PACK_ISOMORPHIC */
import qs from 'query-string';
import {createRoot, hydrateRoot} from 'react-dom/client';

import App from './App';
import {saveObjToQueryString} from './components/util';

let appElement = <App />;

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	// On initial load, we'll read the query-string and set up the default values
	const args = qs.parse(window.location.search);
	const debug = (args.debug === 'true');
	const index = parseInt(args.index || 0);
	const itemIndex = parseInt(args.itemIndex || 0);

	const handleChangePanel = (ev) => {
		// Clone the ev object so we don't taint other callbacks
		const newParams = Object.assign({}, ev);

		// Remove `index` if it's set to `0`, null, or undefined. We can simply not have it, since 0 is the default.
		if (!newParams.index) {
			newParams.index = null;
		}
		saveObjToQueryString(newParams);
	};

	const handleChangeDebug = (ev) => {
		// Clone the ev object so we don't taint other callbacks
		const newParams = Object.assign({}, ev);
		if (!newParams.debug) {
			newParams.debug = null;
		}
		saveObjToQueryString(newParams);
	};

	appElement = (
		<App defaultDebug={debug} defaultIndex={index} defaultItemIndex={itemIndex} onChangePanel={handleChangePanel} onToggleDebug={handleChangeDebug} />
	);

	const container = document.getElementById('root');

	if (ENACT_PACK_ISOMORPHIC) {
		hydrateRoot(container, appElement);
	} else {
		createRoot(container).render(appElement);
	}
}

export default appElement;
