import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Kitten from '../Kitten';

describe('Kitten Specs', () => {
	test('should render a Kitten with content', function () {
		const content = 'Hello Kitten!';

		render(<Kitten>{content}</Kitten>);

		const actual = screen.getByText(content);

		expect(actual).toBeInTheDocument();
	});

	test('should callback with index when clicked', function () {
		let index = 0;
		const handleSelect = jest.fn();

		render(<Kitten data-testid="kitten" index={0} onSelect={handleSelect} />);

		const kitten = screen.getByTestId('kitten');

		userEvent.click(kitten);

		const expected = index;
		const actual = handleSelect.mock.calls[0][0].index;

		expect(actual).toEqual(expected);

	});
});
