import React, {PropTypes} from 'react';
import Button from '@enact/moonstone/Button';

const SaveButton = ({saved, saveToState}) => {
	const handleOnChange = () => {
		saveToState(!saved);
	};

	return (
		<Button onClick={handleOnChange}>
			Save
		</Button>
	);
};

SaveButton.propTypes = {
	saved: PropTypes.bool.isRequired,
	saveToState: PropTypes.func.isRequired
};

export default SaveButton;
