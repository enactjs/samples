import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

const AboutPanel = kind({
	name: 'AboutPanel',

	propTypes: {
		onClick: PropTypes.func,
		title: PropTypes.string
	},

	render: ({onClick, title, ...rest}) => {
		delete rest.spotlightId;

		return (
			<div {...rest}>
				<h1>{title}</h1>
				<button onClick={onClick}>To Second Panel</button>

				<div>Hello !!</div>
			</div>
		);
	}
});

export default AboutPanel;
