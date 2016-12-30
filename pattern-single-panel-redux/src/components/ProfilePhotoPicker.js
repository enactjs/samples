import React from 'react';
import kind from '@enact/core/kind';
import PhotoPickerContainer from '../container-components/PhotoPickerContainer';
import ProfilePhotoPickerContainer from '../container-components/PhotoPreviewContainer';
import SliderContainer from '../container-components/SliderContainer';
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
