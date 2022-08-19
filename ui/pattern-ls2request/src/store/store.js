import { configureStore } from '@reduxjs/toolkit';

import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

export default function configureAppStore(initialState) {
	const store = configureStore({
		reducer: rootReducer.reducer,
		initialState,
		middleware: [thunkMiddleware]
	});

	if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./store.js', () => {
            store.replaceReducer(rootReducer.reducer);
        });
    }

	return store;
}
