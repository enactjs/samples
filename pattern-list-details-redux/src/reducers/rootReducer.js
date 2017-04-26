const sampleData = {
	countryList: ['usa', 'spain', 'korea', 'japan'],
	usa: {
		name: 'usa',
		cityList: ['San Francisco', 'Los Angeles', 'New York City'],
		selected: true,
		sanfrancisco: {name: 'San Francisco', selected: true},
		losangeles: {name: 'Los Angeles', selected: false},
		newyorkcity: {name: 'New York City', selected: false}
	},
	spain: {
		name: 'spain',
		cityList: ['Madrid', 'Barcelona', 'Valencia'],
		selected: false,
		madrid: {name: 'Madrid', selected: false},
		barcelona: {name: 'Barcelona', selected: false},
		valencia: {name: 'Valencia', selected: false}
	},
	korea: {
		name: 'korea',
		cityList: ['Seoul', 'Busan', 'Daegu'],
		selected: false,
		seoul: {name: 'Seoul', selected: false},
		busan: {name: 'Busan', selected: false},
		daegu: {name: 'Daegu', selected: false}
	},
	japan: {
		name: 'japan',
		cityList: ['Tokyo', 'Osaka', 'Kyoto'],
		selected: false,
		tokyo: {name: 'Tokyo', selected: false},
		osaka: {name: 'Osaka', selected: false},
		kyoto: {name: 'Kyoto', selected: false}
	}
};

const initialCountry = sampleData.usa;

const initialState = {
	city: initialCountry.sanfrancisco.name,
	country: initialCountry.name,
	data: sampleData,
	zoom: false
};

const city = (state = initialState.city, action) => {
	switch (action.type) {
		case 'CHANGE_CITY':
			return action.city;
		case 'CHANGE_COUNTRY':
			return sampleData[action.country].cityList[0];
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

const data = (state = initialState, action) => {
	switch (action.type) {
		case 'CHANGE_CITY': {
			const currentCountry = state.country;
			const prevCity = state.city
				.split(' ')
				.join('')
				.toLowerCase();
			const nextCity = action.city
				.split(' ')
				.join('')
				.toLowerCase();
			let newData = Object.assign({}, sampleData);

			newData[currentCountry][nextCity].selected = true;
			newData[currentCountry][prevCity].selected = false;

			return newData;
		}
		case 'CHANGE_COUNTRY': {
			const nextCountry = action.country;
			const prevCountry = state.country;
			const prevCity = state.city
				.split(' ')
				.join('')
				.toLowerCase();
			const nextCity = sampleData[nextCountry].cityList[0]
				.split(' ')
				.join('')
				.toLowerCase();
			let newData = Object.assign({}, sampleData);

			newData[nextCountry].selected = true;
			newData[nextCountry][nextCity].selected = true;
			newData[prevCountry].selected = false;
			newData[prevCountry][prevCity].selected = false;

			return newData;
		}
		default:
			return sampleData;
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

const rootReducer = (state = {}, action) => {
	return {
		city: city(state.city, action),
		country: country(state.country, action),
		data: data(state, action),
		zoom: zoom(state.zoom, action)
	};
};

export default rootReducer;
