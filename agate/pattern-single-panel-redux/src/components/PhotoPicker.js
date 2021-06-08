import BodyText from '@enact/agate/BodyText';
import Image from '@enact/agate/Image';
import Picker from '@enact/agate/Picker';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

const ProfilePhotoPickerContainer = kind({
	name: 'ProfilePhotoPickerContainer',

	propTypes: {
		changePhotoIndex: PropTypes.func.isRequired,
		imageNames: PropTypes.array.isRequired,
		imageURLs: PropTypes.array.isRequired,
		photoIndex: PropTypes.number.isRequired
	},

	handlers: {
		onChange: (ev, {changePhotoIndex}) => {
			const index = ev.value;
			changePhotoIndex(index);
		}
	},

	computed: {
		imageComponents: ({imageURLs}) => {
			return imageURLs.map((url) => (<Image key={url} src={url} />));
		}
	},

	render: ({imageComponents, imageNames, photoIndex, onChange, ...rest}) => {
		delete rest.changePhotoIndex;
		delete rest.imageURLs;

		return (
			<div {...rest}>
				<BodyText centered style={{margin: '0px'}}>
					{imageNames[photoIndex]} :: {photoIndex + 1} of {imageNames.length} photos
				</BodyText>
				<Picker onChange={onChange} width="large">
					{imageComponents}
				</Picker>
			</div>
		);
	}
});

export default ProfilePhotoPickerContainer;
