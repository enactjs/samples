import Button from '@enact/moonstone/Button';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react'; // eslint-disable-line no-unused-vars

const SaveButton = kind({
	name: 'SaveButton',

	propTypes: {
		saveToState: PropTypes.func.isRequired,
		saved: PropTypes.bool
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
			<Button onClick={onChange}>Save</Button>
		);
	}
});

export default SaveButton;
