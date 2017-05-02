import React from 'react';

import App from './App';
import configureStore from './store';
import {Provider} from 'react-redux';

const store = configureStore();

let appElement = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default appElement;
