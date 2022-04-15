import {configureStore, createSlice} from '@reduxjs/toolkit';

const pathSlice = createSlice({
	name: 'pathReducer',
	initialState: {
		path: '/first/second'
	},

	reducers: {
		navigate: (state, action) => {
			state.path = action.payload;
		}
	}
});

export const {navigate} = pathSlice.actions;

export default function configureAppStore (initialState) {
	const store = configureStore({
		reducer: pathSlice.reducer,
		initialState
	});

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./store.js', () => {
			store.replaceReducer(pathSlice.reducer);
		});
	}

	return store;
}
