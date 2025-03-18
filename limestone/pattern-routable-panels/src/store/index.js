import {configureStore, createSlice} from '@reduxjs/toolkit';

const naviSlice = createSlice({
	name: 'naviReducer',
	initialState: {
		path : '/first'
	},
	reducers: {
		navigate: (state, action) => {
			state.path = action.payload;
		}
	}
});

export const {navigate} = naviSlice.actions;
export default function configureAppStore (initialState) {
	const store = configureStore({
		reducer: naviSlice.reducer,
		initialState
	});

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./index.js', () => {
			store.replaceReducer(naviSlice.reducer);
		});
	}

	return store;
}
