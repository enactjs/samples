import reducer from '../';

describe('Redux reducer specs', () => {

	const intialState = {
		country: 'usa',
		city: 'San Francisco',
		data: {
			usa: ['San Francisco', 'Los Angeles', 'New York City'],
			spain: ['Madrid', 'Barcelona', 'Valencia'],
			korea: ['Seoul', 'Busan', 'Daegu'],
			japan: ['Tokyo', 'Osaka', 'Kyoto']
		},
		zoom: false
	};

	it('should return initial state', function () {
		// eslint-disable-next-line
		const actual = reducer(undefined, {});
		const expected = intialState;

		expect(actual).to.deep.equal(expected);
	});

	it('should handle CHANGE_COUNTRY', function () {
		const actual = reducer(intialState, {
			type: 'CHANGE_COUNTRY',
			country: 'France'
		}).country;
		const expected = 'France';

		expect(actual).to.equal(expected);
	});

	it('should handle CHANGE_CITY', function () {
		const actual = reducer(intialState, {
			type: 'CHANGE_CITY',
			city: 'London'
		}).city;
		const expected = 'London';

		expect(actual).equal(expected);
	});

	it('should handle ZOOM', function () {
		const actual = reducer(intialState, {
			type: 'ZOOM',
			zoom: true
		}).zoom;
		const expected = true;

		expect(actual).equal(expected);
	});

	it('should return initial state given nonsense', function () {
		const actual = reducer({}, {
			type: 'doge',
			suchSense: {
				much: 'wow'
			},
			1231: 12312
		});
		const expected = intialState;

		expect(actual).to.deep.equal(expected);
	});
});
