import React from 'react';
import PhotoPickerContainer from '../container-components/PhotoPickerContainer';
import ProfilePhotoPickerContainer from '../container-components/PhotoPreviewContainer';
import SliderContainer from '../container-components/SliderContainer';
import css from './styles.less';

const ProfilePhotoPicker = () => (
	<div className={css.profilePhotoPicker}>
		<ProfilePhotoPickerContainer />
		<SliderContainer />
		<PhotoPickerContainer />
	</div>
);

export default ProfilePhotoPicker;
