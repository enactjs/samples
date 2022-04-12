import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SaveButton from '../SaveButton.js';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('SaveButton specs', () => {

	test('should open Popup on Button click', function () {
		const message = 'Saved!'
		render(
			<FloatingLayerController>
				<SaveButton />
			</FloatingLayerController>
		);

		const button = screen.getByRole('button');

		userEvent.click(button);

		const popup = screen.getByRole('alert');

		const expected = message;
		const actual = popup.children.item(0);

		expect(actual).toHaveTextContent(expected);
	});
});

