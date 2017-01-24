import React from 'react';
import {mount} from 'enzyme';
import SaveButton from '../SaveButton.js';

describe('SaveButton specs', () => {

	// **NOTE: Needed if you want to test Popup or anything with a floatLayer
	beforeEach(() => {
		const div = document.createElement('div');
		div.setAttribute('id', 'floatLayer');
		document.body.appendChild(div);
	});

	afterEach(() => {
		const div = document.getElementById('floatLayer');
		document.body.removeChild(div);
	});
	// **End of hooks that are needed for to test with Popup or anything with a floatLayer

	it('should open Popup on Button click', function () {

		const subject = mount(
			<SaveButton />
		);

		const button = subject.find('Button');
		const popup = subject.find('Popup');

		button.simulate('click');
		const actual = popup.prop('open');
		const expected = true;

		expect(actual).to.equal(expected);
	});
});
