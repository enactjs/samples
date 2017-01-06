import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import Image from '@enact/moonstone/Image';
import css from './containerStyles.less';
import {connect} from 'react-redux';

const PhotoPreview = kind({
	name: 'PhotoPreview',

	propTypes: {
		size: PropTypes.number.isRequired,
		url: PropTypes.string.isRequired
	},

	styles: {
		css,
		className: 'profilePhoto'
	},

	render: ({url, size, ...rest}) => (
		<Image {...rest} src={url} style={{backgroundSize: size + '%'}} />
	)
});

const mapStateToProps = (state) => {
	return ({
		url: state.photo.url,
		size: state.photo.size
	});
};

const ProfilePhotoPickerContainer = connect(
	mapStateToProps,
	null
)(PhotoPreview);

export default ProfilePhotoPickerContainer;
