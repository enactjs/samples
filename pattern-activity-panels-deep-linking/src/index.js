import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import App from './App';
import configureStore from './store';

// set default launch path
const launchParam = '/first/second';
const store = configureStore({
	path: launchParam
});

let appElement = (
	<Provider store={store}>
		<App />
	</Provider>
);

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	render(
		appElement,
		document.getElementById('root')
	);
}

export default appElement;
