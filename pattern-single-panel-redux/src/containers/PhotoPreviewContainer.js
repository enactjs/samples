import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import Image from '@enact/moonstone/Image';
import css from './containerStyles.less';
import {connect} from 'react-redux';

const PhotoPreview = kind({
	name: 'PhotoPreview',

	propTypes: {
		imageURLs: PropTypes.array.isRequired,
		photoIndex: PropTypes.number.isRequired,
		photoPosition: PropTypes.number.isRequired,
		dispatch: PropTypes.func
	},

	styles: {
		css,
		className: 'profilePhoto'
	},

	render: ({imageURLs, photoIndex, photoPosition, ...rest}) => {
		delete rest.dispatch;

		return (
			<Image {...rest} src={imageURLs[photoIndex]} style={{backgroundPosition: photoPosition + 'px'}} />
		);
	}
});

const mapStateToProps = (state) => {
	return ({
		photoIndex: state.photoIndex,
		photoPosition: state.photoPosition
	});
};

const PhotoPreviewContainer = connect(
	mapStateToProps
)(PhotoPreview);

export default PhotoPreviewContainer;
