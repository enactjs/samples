import {createSlice} from '@reduxjs/toolkit';

const rootReducer = createSlice({
	name: 'systemSettings',
	initialState: {},
	reducers: {
		receiveSystemSettings: (state, action) =>  {
			return Object.assign({}, state, action.payload.settings);
		},
		updateSystemSettings: (state, action) => {
			return Object.assign({}, state, action.payload.settings);
		}
	}
});


// function systemSettings (state = {}, action) {
// 	switch (action.type) {
// 		case 'RECEIVE_SYSTEM_SETTINGS':
// 		case 'UPDATE_SYSTEM_SETTINGS':
// 			return Object.assign({}, state, action.payload.settings);
// 		default:
// 			return state;
// 	}
// }

// const rootReducer = combineReducers({
// 	systemSettings
// });

export default rootReducer;
export const {receiveSystemSettings, updateSystemSettings} = rootReducer.actions;