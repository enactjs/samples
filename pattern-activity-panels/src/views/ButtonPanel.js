import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import PropTypes from 'prop-types';

const ButtonPanel = kind({
	name: 'ButtonPanel',

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
			<Header title={title}>
				<Button onClick={onClick}>Click me</Button>
				<Button onClick={onClick}>Click me</Button>
			</Header>
		</Panel>
	)
});

export default ButtonPanel;
