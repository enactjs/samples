/* eslint-disable react/jsx-no-bind */

import React from 'react';
import qs from 'query-string';
import {render} from 'react-dom';

import App from './App';

let appElement = <App />;

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	const args = qs.parse(window.location.search);
	const index = parseInt(args.index || 0);
	const itemIndex = parseInt(args.itemIndex || 0);

	const handleChangePanel = (ev) => {
		const params = qs.parse(window.location.search);
		params.index = ev.index;
		params.itemIndex = ev.itemIndex;

		Object.keys(params).forEach((p) => (params[p] == null) && delete params[p]);
		if (!params.index) {
			delete params.index;
		}

		const stringified = qs.stringify(params);
		window.history.pushState(ev, '', (stringified ? `?${stringified}` : '/'));
	};

	appElement = (
		<App defaultIndex={index} defaultItemIndex={itemIndex} onChangePanel={handleChangePanel} />
	);

	render(appElement, document.getElementById('root'));
}

export default appElement;
