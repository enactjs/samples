import {Header, Panel} from '@enact/moonstone/Panels';
import Item from '@enact/moonstone/Item';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

const ItemPanel = kind({
	name: 'ItemPanel',

	propTypes: {
		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string
	},

	render: ({title, ...rest}) => (
		<Panel {...rest}>
			<Header title={title} />
			<Item>Item 1</Item>
			<Item>Item 2</Item>
			<Item>Item 3</Item>
			<Item>Item 4</Item>
		</Panel>
	)
});

export default ItemPanel;
