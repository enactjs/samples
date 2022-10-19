import PropTypes from 'prop-types';
import {useRef} from 'react';

import ImageItem3D from '../ImageItem3D';

const Image = ({index, name, ...props}) => {
	const group = useRef();

	return (
		<group ref={group}>
			<ImageItem3D index={index} src={`https://picsum.photos/2${10 + parseInt(index)}/2${10 + parseInt(index)}`} {...props}>
				{name}
			</ImageItem3D>
		</group>
	);
};

Image.propTypes = {
	index: PropTypes.number,
	name: PropTypes.string
};

export default Image;
export {Image};
