import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import React from 'react';

import css from './Kitten.less';

const KittenBase = kind({
	name: 'Kitten',

	propTypes: {
		children: React.PropTypes.string,
		index: React.PropTypes.number,
		onSelect: React.PropTypes.func,
		size: React.PropTypes.number
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

	render: ({children, onSelect, url, ...rest}) => {
		delete rest.size;
		delete rest.index;

		return (
			<div {...rest} onClick={onSelect}>
				<img src={url} />
				<div>{children}</div>
			</div>
		);
	}
});

const Kitten = Spottable(KittenBase);

export default Kitten;
export {Kitten, KittenBase};
