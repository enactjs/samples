import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import Image from '@enact/moonstone/Image';
import css from './containerStyles.less';
import {connect} from 'react-redux';

const PhotoPreview = kind({
	name: 'PhotoPreview',

	propTypes: {
		position: PropTypes.number.isRequired,
		url: PropTypes.string.isRequired,
		dispatch: PropTypes.func
	},

	styles: {
		css,
		className: 'profilePhoto'
	},

	render: ({url, position, ...rest}) => {
		delete rest.dispatch;

		return (
			<Image {...rest} src={url} style={{backgroundPosition: position + 'px'}} />
		);
	}
});

const mapStateToProps = (state) => {
	return ({
		url: state.photo.url,
		position: state.photo.position
	});
};

const PhotoPreviewContainer = connect(
	mapStateToProps
)(PhotoPreview);

export default PhotoPreviewContainer;
