/* eslint-disable react/jsx-no-bind */

import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';
import PropTypes from 'prop-types';
import {useState} from 'react';

const SaveButton = (props) => {
	const [saved, setSaved] = useState(false);

	const handleOnSave = () => setSaved(true);
	const handleOnClose = () => setSaved(false);

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
