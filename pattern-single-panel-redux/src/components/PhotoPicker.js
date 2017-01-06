import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import BodyText from '@enact/moonstone/BodyText';
import Image from '@enact/moonstone/Image';
import Picker from '@enact/moonstone/Picker';
import Changeable from '@enact/ui/Changeable';

import car from '../../assets/images/car.jpeg';
import city from '../../assets/images/city.jpeg';
import mural from '../../assets/images/mural.jpeg';
import spaceShuttle from '../../assets/images/space-shuttle.jpg';
import violin from '../../assets/images/violin.jpeg';

const StatefulPicker = Changeable(Picker);

const images = {
	mural,
	violin,
	car,
	city,
	spaceShuttle
};

const imageNames = Object.keys(images);
const imageURLs = Object.values(images);

const ProfilePhotoPickerContainer = kind({
	name: 'ProfilePhotoPickerContainer',

	propTypes: {
		photoIndex: PropTypes.number.isRequired,
		setPreview: PropTypes.func.isRequired
	},

	computed: {
		imageComponents: () => {
			return imageURLs.map(url => (<Image src={url} key={url} />));
		},
		onChange: ({setPreview}) => {
			return (ev) => {
				setPreview({
					url: imageURLs[ev.value],
					photoIndex: ev.value
				});
			};
		}
	},

	render: ({imageComponents, photoIndex, onChange, ...rest}) => {
		delete rest.setPreview;

		return (
			<div {...rest}>
				<BodyText centered>
					{imageNames[photoIndex]} :: {photoIndex + 1} of {imageNames.length} photos
				</BodyText>
				<StatefulPicker onChange={onChange} width="large">
					{imageComponents}
				</StatefulPicker>
			</div>
		);
	}
});

export default ProfilePhotoPickerContainer;
