import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import {Panel, Header} from '@enact/moonstone/Panels';

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
			<Header title={title} />
			<Button onClick={onClick}>Click me</Button>
		</Panel>
	)
});

export default MainPanel;
