import Button from '@enact/moonstone/Button';
import Popup from '@enact/moonstone/Popup';
import PropTypes from 'prop-types';
import {useState, useCallback} from 'react';

const SaveButton = (props) => {
	const [saved, setSaved] = useState(false);

	const handleOnSave = useCallback(() => {
		setSaved(true);
	}, []);

	const handleOnClose = useCallback(() => {
		setSaved(false);
	}, []);

	return (
		<div {...props}>
			<Button onClick={handleOnSave}>
				Save
			</Button>
			<Popup onClose={handleOnClose} open={saved} showCloseButton>
				Saved!
			</Popup>
		</div>
	);
};

SaveButton.propTypes = {
	className: PropTypes.string
};

export default SaveButton;
