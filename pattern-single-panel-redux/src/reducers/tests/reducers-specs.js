import reducer from '../';
import mural from '../../../assets/images/mural.jpeg';

describe('reducer specs', () => {

	const intialState = {
		saved: false,
		photo: {
			index: 0,
			size: 100,
			url: mural
		}
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
		}).photo;
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
		}).photo;
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
