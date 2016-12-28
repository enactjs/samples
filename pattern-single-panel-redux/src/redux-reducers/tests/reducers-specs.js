import reducer from '../reducers.js';

describe('Redux reducer specs', () => {

	const intialState = {
		saved: false,
		setPreview: {
			index: 0,
			size: 100,
			url: 'https://images.pexels.com/photos/38981/pexels-photo-38981.jpeg?h=350&auto=compress'
		}
	};

	it('should return initial state', function () {
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

	it('should handle SET_PREVIEW_PHOTO', function () {
		const savedState = {
			url: 'someurl.com',
			size: 6666,
			index: 9999
		};

		const actual = reducer(intialState, {
			type: 'SET_PREVIEW_PHOTO',
			previewPhoto: {
				url: 'someurl.com',
				size: 6666,
				index: 9999
			}
		}).setPreview;
		const expected = savedState;

		expect(actual).to.deep.equal(expected);
	});

	it('should handle SET_PREVIEW_PHOTO given one key-value', function () {
		const changedState = {
			url: 'someurl.com',
			size: 100,
			index: 0
		};

		const actual = reducer(intialState, {
			type: 'SET_PREVIEW_PHOTO',
			previewPhoto: {
				url: 'someurl.com'
			}
		}).setPreview;
		const expected = changedState;

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
