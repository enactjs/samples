import {configureStore, createSlice} from '@reduxjs/toolkit';

const navSlice = createSlice({
	name: 'naviReducer',
	initialState: {
		path: '/first'
	},
	reducers: {
		navigate: (state, action) => {
			state.path = action.payload;
		}
	}
});

export const {navigate} = navSlice.actions;

export default function configureAppStore (initialState) {
	const store = configureStore({
		reducer: navSlice.reducer,
		initialState
	});

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./index.js', () => {
			store.replaceReducer(navSlice.reducer);
		});
	}

	return store;
}
