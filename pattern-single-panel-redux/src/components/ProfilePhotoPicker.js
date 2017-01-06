import React from 'react';
import kind from '@enact/core/kind';
import PhotoPickerContainer from '../containers/PhotoPickerContainer';
import ProfilePhotoPickerContainer from '../containers/PhotoPreviewContainer';
import SliderContainer from '../containers/SliderContainer';
import css from './componentStyles.less';

const ProfilePhotoPicker = kind({
	name: 'ProfilePhotoPicker',

	styles: {
		css,
		className: 'profilePhotoPicker'
	},

	render: ({...rest}) => (
		<div {...rest}>
			<ProfilePhotoPickerContainer />
			<SliderContainer />
			<PhotoPickerContainer />
		</div>
	)
});

export default ProfilePhotoPicker;
