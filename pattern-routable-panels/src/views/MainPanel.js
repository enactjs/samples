import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		next: PropTypes.string,
		onClick: PropTypes.func,
		title: PropTypes.string
	},

	computed: {
		text: ({next}) => `To ${next} Panel`
	},

	render: ({onClick, text, title, ...rest}) => {
		delete rest.next;
		delete rest.spotlightId;

		return (
			<div {...rest}>
				<h1>{title}</h1>
				<button onClick={onClick}>{text}</button>
			</div>
		);
	}
});

export default MainPanel;
