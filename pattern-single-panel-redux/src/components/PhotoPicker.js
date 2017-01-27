import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import BodyText from '@enact/moonstone/BodyText';
import Image from '@enact/moonstone/Image';
import Picker from '@enact/moonstone/Picker';
import Changeable from '@enact/ui/Changeable';

import css from './componentStyles.less';

const StatefulPicker = Changeable(Picker);

const ProfilePhotoPickerContainer = kind({
	name: 'ProfilePhotoPickerContainer',

	propTypes: {
		changePhotoIndex: PropTypes.func.isRequired,
		imageNames: PropTypes.array.isRequired,
		imageURLs: PropTypes.array.isRequired,
		photoIndex: PropTypes.number.isRequired
	},

	computed: {
		imageComponents: ({imageURLs}) => {
			return imageURLs.map((url) => (<Image className={css.photoPickerImage} src={url} key={url} />));
		},
		onChange: ({changePhotoIndex}) => {
			return (ev) => {
				const index = ev.value;
				changePhotoIndex(index);
			};
		}
	},

	render: ({imageComponents, imageNames, photoIndex, onChange, ...rest}) => {
		delete rest.changePhotoIndex;
		delete rest.imageURLs;

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
