import {mount} from 'enzyme';

import Body from '../../views/Body.js';

describe('Content specs', () => {

	it('should change city photo', function () {

		const cities = {
			usa: ['San Francisco'],
			korea: ['Seoul', 'Busan', 'Daegu']
		};

		const subject = mount(
			<Body selectedCountry="korea" cities={cities} />
		);

		const SideBar = subject.find('SideBar');
		const Item = SideBar.find('GroupItem').last();

		Item.simulate('click');

		const Content = subject.find('Content');
		const actual = Content.prop('selectedCity');
		const expected = 'Daegu';

		expect(actual).toBe(expected);
	});

});
