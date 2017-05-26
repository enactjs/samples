import kind from '@enact/core/kind';
import Item from '@enact/moonstone/Item';
import {Panel, Header} from '@enact/moonstone/Panels';
import React, {PropTypes} from 'react';

const child = 'Click me';

const BodyItemPanel = kind({
	name: 'BodyItemPanel',

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

	render: ({title, onClick}) => (
		<Panel>
			<Header title={title} />
			<Item onClick={onClick}>{child}</Item>
			<Item onClick={onClick}>{child}</Item>
			<Item onClick={onClick}>{child}</Item>
			<Item onClick={onClick}>{child}</Item>
		</Panel>
	)
});

export default BodyItemPanel;
