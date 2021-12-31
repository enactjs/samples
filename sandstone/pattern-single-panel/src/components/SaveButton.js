import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';
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
			<Popup onClose={handleOnClose} open={saved} showCloseButton>
				Saved!
			</Popup>
		</div>
	);
};

export default SaveButton;
