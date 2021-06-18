import {combineReducers} from 'redux';
// NOTE: We use this type of structure for performance.
let initialState = 'en-US';

function locale (state = initialState, action) {
	if (action.type === 'UPDATE_LOCALE') {
		return action.payload;
	}

	return state;
}

const rootReducer = combineReducers({
	locale
});

export default rootReducer;
