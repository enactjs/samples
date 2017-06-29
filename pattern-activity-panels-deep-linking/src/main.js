import React from 'react';
import {Provider} from 'react-redux';
import App from './App';

import configureStore from './store';

// set default launch path
const launchParam = '/first/second';
const store = configureStore({
	path: launchParam
});

const app = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default app;
