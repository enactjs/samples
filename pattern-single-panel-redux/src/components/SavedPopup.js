import React, {PropTypes} from 'react';
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

	computed: {
		onChange: ({saved, saveToState}) => {
			return () => {
				saveToState(!saved);
			};
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
