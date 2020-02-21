import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/sandstone/Panels';
import PropTypes from 'prop-types';
import React from 'react';

import css from './Panel.module.less';

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

	styles: {
		css,
		className: 'panel'
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
