import React from 'react';
import kind from '@enact/core/kind';
import PhotoPickerContainer from '../containers/PhotoPickerContainer';
import PhotoPreviewContainer from '../containers/PhotoPreviewContainer';
import PhotoSliderContainer from '../containers/PhotoSliderContainer';
import css from './componentStyles.less';

const ProfilePhotoPicker = kind({
	name: 'ProfilePhotoPicker',

	styles: {
		css,
		className: 'profilePhotoPicker'
	},

	render: ({...rest}) => (
		<div {...rest}>
			<PhotoPreviewContainer />
			<PhotoSliderContainer />
			<PhotoPickerContainer />
		</div>
	)
});

export default ProfilePhotoPicker;
