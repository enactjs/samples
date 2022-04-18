/* eslint-disable react-hooks/rules-of-hooks */

import kind from '@enact/core/kind';
import Image from '@enact/moonstone/Image';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import css from './containerStyles.module.less';

const PhotoPreviewContainer = kind({
	name: 'PhotoPreview',

	functional: true,

	propTypes: {
		imageURLs: PropTypes.array.isRequired,
		dispatch: PropTypes.func
	},

	styles: {
		css,
		className: 'profilePhoto'
	},

	render: ({imageURLs,  ...rest}) => {
		const photoIndex = useSelector(state => state.photoIndex);
		const photoPosition = useSelector(state => state.photoPosition);

		delete rest.dispatch;

		return (
			<Image {...rest} src={imageURLs[photoIndex]} style={{backgroundPosition: photoPosition + 'px'}} />
		);
	}
});

export default PhotoPreviewContainer;
