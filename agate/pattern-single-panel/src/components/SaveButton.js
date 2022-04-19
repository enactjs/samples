import Button from '@enact/agate/Button';
import Popup from '@enact/agate/Popup';
import {useCallback, useState} from 'react';

const SaveButton = (props) => {
	const [saved, setSaved] = useState(false);

	const handleOnSave = useCallback(() => setSaved(true), []);
	const handleOnClose = useCallback(() => setSaved(false), []);

	return (
		<div {...props}>
			<Button onClick={handleOnSave} size="small">
				Save
			</Button>
			<Popup closeButton onClose={handleOnClose} open={saved}>
				Saved!
			</Popup>
		</div>
	);
}

export default SaveButton;
