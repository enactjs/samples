import {mount} from 'enzyme';

import MainView from '../../views/MainView.js';

describe('MainView specs', () => {

	it('should change country', function () {

		const subject = mount(
			<MainView />
		);

		const Nav = subject.find('Nav');
		const button = Nav.find('GroupItem').last();

		button.simulate('click');

		const actual = subject.state('country');
		const expected = 'japan';

		expect(actual).toBe(expected);
	});

});
