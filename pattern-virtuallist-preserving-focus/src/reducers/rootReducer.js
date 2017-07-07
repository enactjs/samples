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

function lastScrollInfo (state = [], action) {
	switch (action.type) {
		case 'SAVE_LAST_SCROLL_INFO':
			return [...state.slice(0, action.index), action.info, ...state.slice(action.index + 1)];
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	index,
	lastScrollInfo
});

export default rootReducer;
