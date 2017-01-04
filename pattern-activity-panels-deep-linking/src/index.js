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

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
