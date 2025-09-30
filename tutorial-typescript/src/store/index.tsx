import {configureStore, createSlice} from '@reduxjs/toolkit';

const naviSlice = createSlice({
	name: 'naviReducer',
	initialState: {
		path : '/first'
	},
	reducers: {
		navigate: (state: any, action: any) => {
			state.path = action.payload;
		}
	}
});

export const {navigate} = naviSlice.actions;
// @ts-ignore
export default function configureAppStore (initialState) {
	// @ts-ignore
	const store = configureStore({
		reducer: naviSlice.reducer,
		preloadedState: initialState
	});

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./index.tsx', () => {
			store.replaceReducer(naviSlice.reducer);
		});
	}

	return store;
}
