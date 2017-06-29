import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';

const SaveButton = kind({
	name: 'SaveButton',

	propTypes: {
		saved: PropTypes.bool.isRequired,
		saveToState: PropTypes.func.isRequired
	},

	defaultProps: {
		saved: false
	},

	handlers: {
		onChange: (ev, {saved, saveToState}) => {
			saveToState(!saved);
		}
	},

	render: ({onChange, ...rest}) => {
		delete rest.saved;
		delete rest.saveToState;

		return (
			<Button onClick={onChange}>
				Save
			</Button>
		);
	}
});

export default SaveButton;
