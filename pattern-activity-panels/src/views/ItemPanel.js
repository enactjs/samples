import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import React, {PropTypes} from 'react';


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

		</Panel>
	)
});

export default ItemPanel;
