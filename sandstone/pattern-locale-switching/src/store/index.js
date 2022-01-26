import {configureStore, createSlice} from '@reduxjs/toolkit';

const localeSlice = createSlice( {
	name: 'localeReducer',
	initialState: {locale : 'en-US'},
	reducers: {
		updateLocale: (state, action) => {
			state.locale = action.payload;
		}
	}
});

const store = configureStore({
	reducer: localeSlice.reducer
});

export const {updateLocale} = localeSlice.actions;
export default store;
