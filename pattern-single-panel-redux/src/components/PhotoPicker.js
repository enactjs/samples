import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import BodyText from '@enact/moonstone/BodyText';
import Image from '@enact/moonstone/Image';
import Picker from '@enact/moonstone/Picker';

import css from './componentStyles.less';

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
			return imageURLs.map((url) => (<Image className={css.photoPickerImage} src={url} key={url} />));
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
				<Picker onChange={onChange} width="large">
					{imageComponents}
				</Picker>
			</div>
		);
	}
});

export default ProfilePhotoPickerContainer;
