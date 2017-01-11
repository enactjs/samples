import {combineReducers} from 'redux';

function index (state = 0, action) {
	switch (action.type) {
		case 'INCREASE_INDEX':
			return state + 1;
		case 'DECREASE_INDEX':
			return state > 0 ? state - 1 : 0;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	index
});

export default rootReducer;
