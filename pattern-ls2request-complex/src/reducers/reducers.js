import {combineReducers} from 'redux';

const lunaService = (state = {}, action) => {
	switch (action.type) {
		case 'LS2REQUEST_SUCCESS':
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	lunaService
});

export default rootReducer;
