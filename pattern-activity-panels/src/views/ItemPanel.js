import Item from '@enact/sandstone/Item';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/sandstone/Panels';
import PropTypes from 'prop-types';
import React from 'react';

import css from './Panel.module.less';

const ItemPanel = kind({
	name: 'ItemPanel',

	propTypes: {
		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		onClick: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string
	},

	styles: {
		css,
		className: 'panel'
	},

	render: ({title, onClick, ...rest}) => (
		<Panel {...rest}>
			<Header title={title} />
			<Item onClick={onClick}>Click me</Item>
			<Item onClick={onClick}>Click me</Item>
			<Item onClick={onClick}>Click me</Item>
			<Item onClick={onClick}>Click me</Item>
		</Panel>
	)
});

export default ItemPanel;
