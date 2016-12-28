import React, {PropTypes} from 'react';
import Popup from '@enact/moonstone/Popup';

const SavedPopup = ({saved, saveToState}) => {
	const handleOnChange = () => {
		saveToState(!saved);
	};

	return (
		<Popup open={saved} onClose={handleOnChange} showCloseButton>
			<small>
				Saved!
			</small>
		</Popup>
	);
};

SavedPopup.propTypes = {
	saved: PropTypes.bool.isRequired,
	saveToState: PropTypes.func.isRequired
};

export default SavedPopup;
