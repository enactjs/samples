import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Touchable from '@enact/ui/Touchable';
import compose from 'ramda/src/compose';

import css from './SpottableButton.module.less';

const HoldButtonBase = kind({
	name: 'HoldButton',

	styles: {
		css,
		className: 'button'
	},

	render: ({children, ...rest}) => (
		<div role="button" {...rest}>
			{children}
		</div>
	)
});

// Touchable must wrap Spottable so Enter key emulation reaches Touchable's onMouseDown.
const HoldButton = compose(
	Touchable,
	Spottable
)(HoldButtonBase);

export default HoldButton;
