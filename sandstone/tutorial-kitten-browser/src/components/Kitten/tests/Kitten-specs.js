import {mount} from 'enzyme';
import Kitten from '../Kitten';

describe('Kitten Specs', () => {
	it('should render a Kitten with content', function () {
		const content = 'Hello Kitten!';

		const kitten = mount(
			<Kitten>{content}</Kitten>
		);

		const expected = content;
		const actual = kitten.text();

		expect(actual).toBe(expected);
	});

	it('should callback with index when clicked', function () {
		let index = 0;
		const handleSelect = jest.fn();

		const kitten = mount(
			<Kitten index={0} onSelect={handleSelect} />
		);

		kitten.simulate('click', {});

		const expected = index;
		const actual = handleSelect.mock.calls[0][0].index;

		expect(actual).toBe(expected);
	});
});
