import React from 'react';
import {Provider} from 'react-redux';
import App from './App';

import configureStore from './store';

const store = configureStore();

const appElement = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default appElement;
