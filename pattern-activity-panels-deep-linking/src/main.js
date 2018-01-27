import React from 'react';

import App from './App';
import configureStore from './store';
import {Provider} from 'react-redux';

// set default launch path
const launchParam = '/first/second';
const store = configureStore({
	path: launchParam
});

let appElement = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default appElement;
