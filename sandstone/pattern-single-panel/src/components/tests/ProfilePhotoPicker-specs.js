import {mount} from 'enzyme';

import ProfilePhotoPicker, {imageURLs} from '../ProfilePhotoPicker.js';

describe('ProfilePhotoPicker specs', () => {

	it('should change ProfilePhoto image src', function () {

		const subject = mount(
			<ProfilePhotoPicker />
		);

		subject.setState({photoIndex: 2});

		const profilePhoto = subject.find('Image');
		const actual = profilePhoto.getElements()[0].props.src;
		const expected = imageURLs[2];

		expect(actual).toBe(expected);
	});

	it('should change ProfilePhoto background-position', function () {

		const subject = mount(
			<ProfilePhotoPicker />
		);

		subject.setState({photoPosition: -75});

		const profilePhoto = subject.find('Image');
		const actual = profilePhoto.getElements()[0].props.style.backgroundPosition;
		const expected = '-75px';

		expect(actual).toBe(expected);
	});
});
