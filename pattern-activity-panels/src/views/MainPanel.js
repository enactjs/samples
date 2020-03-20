import Button from '@enact/moonstone/Button';
import Item from '@enact/moonstone/Item';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';
import React from 'react';

const MainPanel = kind({
	name: 'MainPanel',

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
			<Item onClick={onNextPanel}>Click me</Item>
			<Item onClick={onNextPanel}>Click me</Item>
			<Item onClick={onNextPanel}>Click me</Item>
			<Item onClick={onNextPanel}>Click me</Item>
		</Panel>
	)
});

export default MainPanel;
