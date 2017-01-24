import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import Kitten from '../Kitten';

describe('Kitten Specs', () => {
	it('should render a Kitten with content', function () {
		const content = 'Hello Kitten!';

		const kitten = mount(
			<Kitten>{content}</Kitten>
		);

		const expected = content;
		const actual = kitten.text();

		expect(actual).to.equal(expected);
	});

	it('should callback with index when clicked', function () {
		let index = 0;
		const handleSelect = sinon.spy();

		const kitten = mount(
			<Kitten index={0} onSelect={handleSelect} />
		);

		kitten.simulate('click', {});

		const expected = index;
		const actual = handleSelect.firstCall.args[0].index;

		expect(actual).to.equal(expected);
	});
});
