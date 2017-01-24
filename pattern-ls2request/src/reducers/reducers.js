import {combineReducers} from 'redux';

function systemSettings (state = {}, action) {
	switch (action.type) {
		case 'RECEIVE_SYSTEM_SETTINGS':
		case 'UPDATE_SYSTEM_SETTINGS':
			return Object.assign({}, state, action.payload.settings);
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	systemSettings
});

export default rootReducer;
