import React from 'react';
import {mount} from 'enzyme';
import ProfilePhotoPicker, {imageURLs} from '../ProfilePhotoPicker.js';

describe('ProfilePhotoPicker specs', () => {

	it('should change ProfilePhoto image src', function () {

		const subject = mount(
			<ProfilePhotoPicker />
		);

		const profilePhoto = subject.find('Image');

		subject.setState({photoIndex: 2});
		const actual = profilePhoto.node.props.src;
		const expected = imageURLs[2];

		expect(actual).to.equal(expected);
	});

	it('should change ProfilePhoto background-position', function () {

		const subject = mount(
			<ProfilePhotoPicker />
		);

		const profilePhoto = subject.find('Image');

		subject.setState({photoPosition: -75});
		const actual = profilePhoto.node.props.style.backgroundPosition;
		const expected = '-75px';

		expect(actual).to.equal(expected);
	});
});
