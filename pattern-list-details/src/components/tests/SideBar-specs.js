import React from 'react';
import {mount} from 'enzyme';
import Body from '../../views/Body.js';

describe('SideBar specs', () => {

	it('should change city', function () {

		const cities = {
			usa: ['San Francisco'],
			japan: ['Tokyo', 'Osaka', 'Kyoto']
		};

		const subject = mount(
			<Body selectedCountry="japan" cities={cities} />
		);

		const SideBar = subject.find('SideBar');
		const Item = SideBar.find('SelectableItem').last();

		Item.simulate('click');
		const actual = subject.state('city');
		const expected = 'Kyoto';

		expect(actual).to.equal(expected);
	});

});
