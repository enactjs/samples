import {combineReducers} from 'redux';

function cameraIds (state = {}, action) {
	switch (action.type) {
		case 'GET_CAMERA_ID':
			return action.payload;
		default:
			return state;
	}
}

function cameraStatus (state = {}, action) {
	switch (action.type) {
		case 'UPDATE_CAMERA_STATUS':
			return action.payload;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	cameraIds,
	cameraStatus
});

export default rootReducer;
