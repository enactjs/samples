import Button from '@enact/limestone/Button';
import Popup from '@enact/limestone/Popup';
import {useCallback, useState} from 'react';

const SaveButton = (props) => {
	const [saved, setSaved] = useState(false);

	const handleOnSave = useCallback(() => setSaved(true), []);
	const handleOnClose = useCallback(() => setSaved(false), []);

	return (
		<div {...props}>
			<Button onClick={handleOnSave}>
				Save
			</Button>
			<Popup onClose={handleOnClose} open={saved}>
				Saved!
			</Popup>
		</div>
	);
};

export default SaveButton;
