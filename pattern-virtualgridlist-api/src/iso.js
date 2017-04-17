import {Provider} from 'react-redux';
import React from 'react';

import App from './App';
import configureStore from './store/index';

const store = configureStore();

module.exports = (
	<Provider store={store}>
		<App />
	</Provider>
);
