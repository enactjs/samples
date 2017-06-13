import React from 'react';
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
		const Image = subject.find('Image');
		const Item = SideBar.find('SelectableItem').last();

		Item.simulate('click');
		const actual = Image.prop('src').split('/').pop();
		const expected = 'daegu.jpeg';

		expect(actual).to.equal(expected);
	});

});
