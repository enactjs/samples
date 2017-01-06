import reducer from '../';

describe('Redux reducer specs', () => {

	const intialState = {
		country: 'usa',
		city: 'San Francisco',
		zoom: false
	};

	it('should return initial state', function () {
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

		expect(actual).to.deep.equal(expected);
	});

	it('should handle ZOOM_IN', function () {
		const actual = reducer(intialState, {
			type: 'SET_PREVIEW_PHOTO',
			zoom: false
		}).zoom;
		const expected = false;

		expect(actual).to.deep.equal(expected);
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
