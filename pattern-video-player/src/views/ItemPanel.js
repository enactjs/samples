import kind from '@enact/core/kind';
import Item from '@enact/moonstone/Item';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import PropTypes from 'prop-types';

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
