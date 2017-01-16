import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import Item from '@enact/moonstone/Item';
import {Panel, Header} from '@enact/moonstone/Panels';
import React, {PropTypes} from 'react';

const child = 'Click me';

const MainPanel = kind({
	name: 'MainPanel',

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
			<Header title={title}>
				<Button onClick={onClick}>{child}</Button>
				<Button onClick={onClick}>{child}</Button>
			</Header>
			<Item onClick={onClick}>{child}</Item>
			<Item onClick={onClick}>{child}</Item>
			<Item onClick={onClick}>{child}</Item>
			<Item onClick={onClick}>{child}</Item>
		</Panel>
	)
});

export default MainPanel;
