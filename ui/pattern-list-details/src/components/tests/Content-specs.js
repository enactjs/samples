import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Body from '../../views/Body.js';

describe('Content specs', () => {

	test('should change city photo', function () {
		const cities = {
			usa: ['San Francisco'],
			korea: ['Seoul', 'Busan', 'Daegu']
		};

		render(<Body selectedCountry="korea" cities={cities} />);

		const SideBar = screen.getByRole('group');
		const Item = SideBar.children.item(2);

		userEvent.click(Item);

		const cityPhoto = screen.getAllByRole('img');
		const actual = cityPhoto[0].children.item(0);

		const expected = 'daegu.jpeg';

		expect(actual).toHaveAttribute('src', expected);
	});

});
