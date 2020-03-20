import Button from '@enact/moonstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';
import React from 'react';

const ButtonPanel = kind({
	name: 'ButtonPanel',

	propTypes: {
		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		onNextPanel: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string
	},

	render: ({title, onNextPanel, ...rest}) => (
		<Panel {...rest}>
			<Header title={title}>
				<Button onClick={onNextPanel}>Click me</Button>
				<Button onClick={onNextPanel}>Click me</Button>
			</Header>
		</Panel>
	)
});

export default ButtonPanel;
