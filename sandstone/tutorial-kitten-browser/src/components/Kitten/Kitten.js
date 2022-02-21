import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import PropTypes from 'prop-types';

import css from './Kitten.module.less';

const SpottableDiv = Spottable('div');

const KittenBase = kind({
	name: 'Kitten',

	propTypes: {
		children: PropTypes.string,
		index: PropTypes.number,
		onSelect: PropTypes.func,
		size: PropTypes.number
	},

	defaultProps: {
		size: 300
	},

	styles: {
		css,
		className: 'kitten'
	},

	handlers: {
		onSelect: (ev, {index, onSelect}) => {
			if (onSelect) {
				onSelect({index});
			}
		}
	},

	computed: {
		url: ({index, size}) => {
			return `//loremflickr.com/${size}/${size}/kitten?random=${index}`;
		}
	},

	render: ({children, onSelect, size, url, ...rest}) => {
		delete rest.index;

		return (
			<SpottableDiv {...rest} onClick={onSelect}>
				<img src={url} alt="Kitten" width={size} height={size} />
				<div>{children}</div>
			</SpottableDiv>
		);
	}
});

const Kitten = KittenBase;

export default Kitten;
export {
	Kitten,
	KittenBase
};
