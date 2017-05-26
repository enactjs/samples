import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import {Panel, Header} from '@enact/moonstone/Panels';
import React, {PropTypes} from 'react';

const child = 'Click me';

const HeaderPanel = kind({
	name: 'HeaderPanel',

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
		</Panel>
	)
});

export default HeaderPanel;
