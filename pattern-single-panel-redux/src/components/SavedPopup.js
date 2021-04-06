import kind from '@enact/core/kind';
import Popup from '@enact/moonstone/Popup';
import PropTypes from 'prop-types';
import React from 'react'; // eslint-disable-line no-unused-vars

const SavedPopup = kind({
	name: 'SavedPopup',

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

	render: ({onChange, saved, ...rest}) => {
		delete rest.saveToState;

		return (
			<Popup open={saved} onClose={onChange} showCloseButton>
				Saved!
			</Popup>
		);
	}
});

export default SavedPopup;
