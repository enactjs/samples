import {combineReducers} from 'redux';

const country = (state = 'usa', action) => {
	switch (action.type) {
		case 'CHANGE_COUNTRY':
			return action.country;
		default:
			return state;
	}
};

const city = (state = 'San Francisco', action) => {
	switch (action.type) {
		case 'CHANGE_CITY':
			return action.city;
		default:
			return state;
	}
};

const zoom = (state = false, action) => {
	switch (action.type) {
		case 'ZOOM_IN':
			return !state;
		default:
			return state;
	}
};

const reducer = combineReducers({
	country,
	city,
	zoom
});

export default reducer;
