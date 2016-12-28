import React, {PropTypes} from 'react';
import Image from '@enact/moonstone/Image';
import css from './styles.less';


const PhotoPreview = ({url, size}) => (
	<Image className={css.profilePhoto} src={url} style={{backgroundSize: size + '%'}} />
);

PhotoPreview.propTypes = {
	size: PropTypes.number.isRequired,
	url: PropTypes.string.isRequired
};

export default PhotoPreview;
