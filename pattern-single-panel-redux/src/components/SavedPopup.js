import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import Popup from '@enact/moonstone/Popup';

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
				<small>
					Saved!
				</small>
			</Popup>
		);
	}
});

export default SavedPopup;
