import {configureStore, createSlice} from '@reduxjs/toolkit';

let initialState = 'en-US';

const localeSwitchSlice = createSlice({
	name: 'localeSwitchReducer',
	initialState: {localeSwitch: initialState},
	reducers: {
		updateLocale: {
			reducer: (state, action) => {
				return action.payload;
			},
			prepare: (locale) => {
				return {payload: {locale}};
			}
		}
	}
});

export const {updateLocale} = localeSwitchSlice.actions;

export default function configureAppStore () {
	const store = configureStore({
		reducer: localeSwitchSlice.reducer,
		initialState
	});
	return store;
}
