import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';

import css from './SpottableButton.module.less';

const SpottableButton = Spottable(kind({
	name: 'SpottableButton',

	styles: {
		css,
		className: 'button'
	},

	render: ({children, disabled, ...rest}) => (
		<div role="button" {...rest} aria-disabled={disabled ? 'true' : null}>
			{children}
		</div>
	)
}));

export default SpottableButton;
