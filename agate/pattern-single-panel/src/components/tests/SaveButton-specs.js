import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import {mount} from 'enzyme';

import SaveButton from '../SaveButton.js';

const FloatingLayerController = FloatingLayerDecorator('div');

describe('SaveButton specs', () => {

	it('should open Popup on Button click', function () {

		const subject = mount(
			<FloatingLayerController>
				<SaveButton />
			</FloatingLayerController>
		);

		const button = subject.find('Button');

		button.simulate('click');
		
		const popup = subject.find('PopupBase');

		const actual = popup.prop('open');
		const expected = true;

		expect(actual).toBe(expected);
	});
});
