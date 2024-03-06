import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProfilePhotoPicker, {imageURLs} from '../ProfilePhotoPicker.js';

const focus = (slider) => fireEvent.focus(slider);
const keyDown = (keyCode) => (slider) => fireEvent.keyDown(slider, {keyCode});
const keyUp = (keyCode) => (slider) => fireEvent.keyUp(slider, {keyCode});
const rightKeyDown = keyDown(39);
const enterKeyUp = keyUp(13);

describe('ProfilePhotoPicker specs', () => {

	test('should change ProfilePhoto image src', async function () {
		const user = userEvent.setup();

		render(<ProfilePhotoPicker />);

		const button = screen.getByLabelText(/next/);

		await user.click(button);
		await user.click(button);

		const profilePhoto = screen.getAllByRole('img');

		const actual = profilePhoto[0].children.item(0);
		const expected = imageURLs[2];

		expect(actual).toHaveAttribute('src', expected);
	});

	test('should change ProfilePhoto background-position', function () {
		render(<ProfilePhotoPicker />);

		const slider = screen.getByRole('slider');

		focus(slider);
		enterKeyUp(slider);
		rightKeyDown(slider);

		const profilePhoto = screen.getAllByRole('img');
		const actual = profilePhoto[0];
		const expected = '-99px';

		expect(actual).toHaveStyle(`background-position: ${expected}`);
	});
});
