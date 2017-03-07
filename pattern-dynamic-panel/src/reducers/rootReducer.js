// const sampleData = {
// 	countryList: ['usa', 'spain', 'korea', 'japan'],
// 	usa: {
// 		name: 'usa',
// 		cityList: ['San Francisco', 'Los Angeles', 'New York City'],
// 		selected: true,
// 		sanfrancisco: {name: 'San Francisco', selected: true},
// 		losangeles: {name: 'Los Angeles', selected: false},
// 		newyorkcity: {name: 'New York City', selected: false}
// 	},
// 	spain: {
// 		name: 'spain',
// 		cityList: ['Madrid', 'Barcelona', 'Valencia'],
// 		selected: false,
// 		madrid: {name: 'Madrid', selected: false},
// 		barcelona: {name: 'Barcelona', selected: false},
// 		valencia: {name: 'Valencia', selected: false}
// 	},
// 	korea: {
// 		name: 'korea',
// 		cityList: ['Seoul', 'Busan', 'Daegu'],
// 		selected: false,
// 		seoul: {name: 'Seoul', selected: false},
// 		busan: {name: 'Busan', selected: false},
// 		daegu: {name: 'Daegu', selected: false}
// 	},
// 	japan: {
// 		name: 'japan',
// 		cityList: ['Tokyo', 'Osaka', 'Kyoto'],
// 		selected: false,
// 		tokyo: {name: 'Tokyo', selected: false},
// 		osaka: {name: 'Osaka', selected: false},
// 		kyoto: {name: 'Kyoto', selected: false}
// 	}
// };
//
// const initialCountry = sampleData.usa;

const initialState = {
	path: '/a/b/c'
};

const path = (state = initialState.path, action, ...rest) => {
	console.log('REDUCER STATE:', state);
	console.log('GOT THIS ACTION', action);
	console.log('GOT THIS, TOO', rest);
	switch (action.type) {
		case 'NAVIGATE':
			return action.payload.path;
		default:
			return state;
	}
};

const rootReducer = (state = {}, action) => {
	return {
		path: path(state.path, action)
	};
};

export default rootReducer;

