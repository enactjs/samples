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

const imageURLs = [
	mural,
	violin,
	car,
	city,
	spaceShuttle
];

const imageNames = ['Mural', 'Violin', 'Vintage Car', 'City', 'Space Shuttle'];

const imageComponents = imageURLs.map(url => (<Image src={url} key={url} />));

const ProfilePhotoPickerContainer = kind({
	name: 'ProfilePhotoPickerContainer',

	propTypes: {
		index: PropTypes.number.isRequired,
		setPreview: PropTypes.func.isRequired
	},

	computed: {
		onChange: ({setPreview}) => {
			return (ev) => {
				setPreview({
					url: imageURLs[ev.value],
					index: ev.value
				});
			};
		}
	},

	render: ({index, onChange, ...rest}) => {
		delete rest.setPreview;

		return (
			<div {...rest}>
				<BodyText centered>
					{imageNames[index]} :: {index + 1} of {imageNames.length} photos
				</BodyText>
				<StatefulPicker onChange={onChange} width="large">
					{imageComponents}
				</StatefulPicker>
			</div>
		);
	}
});

export default ProfilePhotoPickerContainer;
