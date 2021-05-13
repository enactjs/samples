import reducer from '../';

describe('reducer specs', () => {

	const intialState = {
		photoIndex: 0,
		photoPosition: -50,
		saved: false
	};

	it('should return initial state', function () {
		// eslint-disable-next-line
		const actual = reducer(undefined, {});
		const expected = intialState;

		expect(actual).to.deep.equal(expected);
	});

	it('should handle SAVE_PROFILE_PHOTO', function () {
		const savedState = true;

		const actual = reducer(intialState, {
			type: 'SAVE_PROFILE_PHOTO',
			saved: true
		}).saved;
		const expected = savedState;

		expect(actual).to.equal(expected);
	});

	it('should handle CHANGE_PHOTO_INDEX', function () {
		const newPhotoIndex = 9999;

		const actual = reducer(intialState, {
			type: 'CHANGE_PHOTO_INDEX',
			photoIndex: 9999
		}).photoIndex;
		const expected = newPhotoIndex;

		expect(actual).equal(expected);
	});

	it('should handle CHANGE_PHOTO_POSITION', function () {
		const photoPosition = 100;

		const actual = reducer(intialState, {
			type: 'CHANGE_PHOTO_POSITION',
			photoPosition: 100
		}).photoPosition;
		const expected = photoPosition;

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
