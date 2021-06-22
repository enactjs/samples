import kind from '@enact/core/kind';
import Popup from '@enact/agate/Popup';
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
			<Popup closeButton onClose={onChange} open={saved}>
				Saved!
			</Popup>
		);
	}
});

export default SavedPopup;
