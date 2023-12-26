import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Body from '../../views/Body.js';

describe('SideBar specs', () => {

	test('should change city', async function () {
		const cities = {
			usa: ['San Francisco'],
			japan: ['Tokyo', 'Osaka', 'Kyoto']
		};
		const user = userEvent.setup();

		render(<Body selectedCountry="japan" cities={cities} />);

		const SideBar = screen.getByRole('group');
		const Item = SideBar.children.item(2);

		await user.click(Item);

		const cityPhoto = screen.getAllByRole('img');
		const actual = cityPhoto[0].children.item(0);

		const expected = 'kyoto.jpeg';

		expect(actual).toHaveAttribute('src', expected);
	});

});
