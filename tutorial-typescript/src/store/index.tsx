import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';

interface NaviState {
	path: string;
}

const initialState: NaviState = {
	path: '/first'
};

const naviSlice = createSlice({
	name: 'naviReducer',
	initialState,
	reducers: {
		navigate: (state, action: PayloadAction<string>) => {
			state.path = action.payload;
		}
	}
});

export const {navigate} = naviSlice.actions;

export default function configureAppStore () {
	const store = configureStore({
		reducer: naviSlice.reducer,
		preloadedState: initialState
	});

	if ((module as any).hot) {
		// Enable Webpack hot module replacement for reducers
		module?.hot?.accept('./index.tsx', () => {
			store.replaceReducer(naviSlice.reducer);
		});
	}

	return store;
}

export type RootState = ReturnType<typeof naviSlice.reducer>;

