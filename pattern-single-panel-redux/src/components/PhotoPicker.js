import React, {PropTypes} from 'react';
import BodyText from '@enact/moonstone/BodyText';
import Image from '@enact/moonstone/Image';
import Picker from '@enact/moonstone/Picker';
import Changeable from '@enact/ui/Changeable';

const StatefulPicker = Changeable(Picker);

const imageURLs = [
	'../images/mural.jpeg',
	'../images/violin.jpeg',
	'../images/car.jpeg',
	'../images/city.jpeg',
	'../images/space-shuttle.jpg'
];

const imageNames = ['Mural', 'Violin', 'Vintage Car', 'City', 'Space Shuttle'];

const imageComponents = imageURLs.map(url => (<Image src={url} key={url} />));

const ProfilePhotoPickerContainer = ({index, setPreview}) => {
	const handleOnChange = (event) => {
		setPreview({
			url: imageURLs[event.value],
			index: event.value
		});
	};

	return (
		<div>
			<BodyText centered>
				{imageNames[index]} :: {index + 1} of {imageNames.length} photos
			</BodyText>
			<StatefulPicker onChange={handleOnChange} width="large">
				{imageComponents}
			</StatefulPicker>
		</div>
	);
};

ProfilePhotoPickerContainer.propTypes = {
	index: PropTypes.number.isRequired,
	setPreview: PropTypes.func.isRequired
};

export default ProfilePhotoPickerContainer;
