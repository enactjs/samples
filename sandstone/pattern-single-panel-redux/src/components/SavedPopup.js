import kind from '@enact/core/kind';
import Popup from '@enact/sandstone/Popup';
import PropTypes from 'prop-types';

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
			<Popup onClose={onChange} open={saved} showCloseButton>
				Saved!
			</Popup>
		);
	}
});

export default SavedPopup;
