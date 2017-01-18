import reducer from '../';

describe('Redux reducer specs', () => {

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

	it('should return initial state', function () {
		// eslint-disable-next-line
		const actual = reducer(undefined, {});
		const expected = initialState;

		expect(actual).to.deep.equal(expected);
	});

	it('should handle CHANGE_COUNTRY', function () {
		const actual = reducer(initialState, {
			type: 'CHANGE_COUNTRY',
			country: 'korea'
		}).country;
		const expected = 'korea';

		expect(actual).to.equal(expected);
	});

	it('should handle CHANGE_CITY', function () {
		const actual = reducer(initialState, {
			type: 'CHANGE_CITY',
			city: 'San Francisco'
		}).city;
		const expected = 'San Francisco';

		expect(actual).equal(expected);
	});

	it('should handle ZOOM', function () {
		const actual = reducer(initialState, {
			type: 'ZOOM',
			zoom: true
		}).zoom;
		const expected = true;

		expect(actual).equal(expected);
	});

	it('should return initial country given nonsense', function () {
		const actual = reducer({}, {
			type: 'doge',
			suchSense: {
				much: 'wow'
			}
		}).country;
		const expected = initialState.country;

		expect(actual).to.deep.equal(expected);
	});
});
