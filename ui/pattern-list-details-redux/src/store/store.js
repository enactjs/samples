import {configureStore, createSlice} from '@reduxjs/toolkit';

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

const listSlice = createSlice({
	name: 'listReducer',
	initialState: {
		city: initialCountry.sanfrancisco.name,
		country: initialCountry.name,
		data: sampleData,
		zoom: false
	},
	reducers: {
		changeCity: (state, action) => {
			const currentCountry = state.country;
			const prevCity = state.city
				.replace(/ /g, '')
				.toLowerCase();
			const nextCity = action.payload
				.replace(/ /g, '')
				.toLowerCase();
			let newData = JSON.parse(JSON.stringify(sampleData));

			newData[currentCountry][nextCity].selected = true;
			newData[currentCountry][prevCity].selected = false;

			state.city = action.payload;
			state.data  = newData;
		},
		changeCountry: (state, action) => {
			const nextCountry = action.payload;
			const prevCountry = state.country;
			const prevCity = state.city
				.replace(/ /g, '')
				.toLowerCase();
			const nextCity = sampleData[nextCountry].cityList[0]
				.replace(/ /g, '')
				.toLowerCase();
			let newData = JSON.parse(JSON.stringify(sampleData));

			newData[nextCountry].selected = true;
			newData[nextCountry][nextCity].selected = true;
			newData[prevCountry].selected = false;
			newData[prevCountry][prevCity].selected = false;

			state.country = action.payload;
			state.city = sampleData[action.payload].cityList[0];
			state.data  = newData;
		},
		changeZoom: (state, action) => {
			state.zoom = action.payload;
		}
	}
});

export const {changeCity, changeCountry, changeZoom} = listSlice.actions;

export default function configureAppStore (initialState) {
	const store = configureStore({
		reducer: listSlice.reducer,
		initialState
	});

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./store.js', () => {
			store.replaceReducer(listSlice.reducer);
		});
	}
	return store;
}
