import React from 'react';
import {render} from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './reducers';

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
	appElement = null;
}

export default appElement;