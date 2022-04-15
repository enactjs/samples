import {configureStore, createSlice} from '@reduxjs/toolkit';

const indexSlice = createSlice({
	name: 'indexReducer',
	initialState: {
		index: 0
	},

	reducers: {
		decreaseIndex: (state) => {
			state.index = state.index > 0 ? state.index - 1 : 0;
		},
		increaseIndex: (state) => {
			state.index = state.index + 1;
		}
	}
});

export const {decreaseIndex, increaseIndex} = indexSlice.actions;

export default function configureAppStore (initialState) {
	const store = configureStore({
		reducer: indexSlice.reducer,
		initialState
	});

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./store.js', () => {
			store.replaceReducer(indexSlice.reducer);
		});
	}

	return store;
}
