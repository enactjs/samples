import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';

import configureStore from './store';

const initialState = {
	country: 'korea',
	city: 'Seoul'
};
const store = configureStore(initialState);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
