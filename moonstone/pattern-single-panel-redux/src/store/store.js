import {configureStore, createSlice} from '@reduxjs/toolkit';

const photoSlice = createSlice({
	name: 'PhotoReducer',
	initialState: {
		photoIndex: 0,
		photoPosition: -50,
		saved: false
	},
	reducers: {
		changePhotoIndex: (state, action) => {
			state.photoIndex = action.payload;
		},
		changePhotoPosition: (state, action) => {
			state.photoPosition = action.payload;
		},
		save: (state, action) => {
			state.saved = action.payload;
		}
	}
});

export const {changePhotoIndex, changePhotoPosition, save} = photoSlice.actions;

export default function configureAppStore (initialState) {
	const store = configureStore({
		reducer: photoSlice.reducer,
		initialState
	});

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./store.js', () => {
			store.replaceReducer(photoSlice.reducer);
		});
	}

	return store;
}
