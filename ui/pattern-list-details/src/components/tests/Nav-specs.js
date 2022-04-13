import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MainView from '../../views/MainView.js';

describe('MainView specs', () => {

	it('should change country', function () {
		render(<MainView />);

		const Nav = screen.getAllByRole('group');
		const button = Nav[0].children.item(3);

		userEvent.click(button);

		const cityPhoto = screen.getAllByRole('img');
		const actual = cityPhoto[0].children.item(0);

		const expected = 'tokyo.jpeg';

		expect(actual).toHaveAttribute('src', expected);
	});

});
