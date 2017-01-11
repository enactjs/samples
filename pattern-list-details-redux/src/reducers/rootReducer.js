import {combineReducers} from 'redux';

const sampleData = {
	usa: ['San Francisco', 'Los Angeles', 'New York City'],
	spain: ['Madrid', 'Barcelona', 'Valencia'],
	korea: ['Seoul', 'Busan', 'Daegu'],
	japan: ['Tokyo', 'Osaka', 'Kyoto']
};

const initialCountry = Object.keys(sampleData)[0];

const initialState = {
	city: sampleData[initialCountry][0],
	country: initialCountry,
	data: sampleData,
	zoom: false
}

const city = (state = initialState.city, action) => {
	switch (action.type) {
		case 'CHANGE_CITY':
			return action.city;
		default:
			return state;
	}
};

const country = (state = initialState.country, action) => {
	switch (action.type) {
		case 'CHANGE_COUNTRY':
			return action.country;
		default:
			return state;
	}
};

const data = (state = initialState.data, action) => {
	switch (action.type) {
		case 'UPDATE_DATA':
			return action.data;
		default:
			return state;
	}
};

const zoom = (state = initialState.zoom, action) => {
	switch (action.type) {
		case 'ZOOM':
			return action.zoom;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	city,
	country,
	data,
	zoom
});

export default rootReducer;
