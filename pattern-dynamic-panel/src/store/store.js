import {createStore} from 'redux';
import rootReducer from '../reducers/rootReducer';

export default function configureStore (initialState) {
	const store = createStore(
		rootReducer,
		initialState
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers/rootReducer', () => {
			const nextRootReducer = require('../reducers/rootReducer').default;

			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}

