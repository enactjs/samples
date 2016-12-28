import React, {PropTypes} from 'react';
import Slider from '@enact/moonstone/Slider';
import css from './styles.less';

const PhotoSlider = ({size, setPreview}) => {
	const handleOnChange = (event) => {
		setPreview({
			size: event.value
		});
	};

	return (
		<div>
			<Slider className={css.slider} min={100} max={200} value={size} onChange={handleOnChange} />
		</div>
	);
};

PhotoSlider.propTypes = {
	setPreview: PropTypes.func.isRequired,
	size: PropTypes.number.isRequired
};

export default PhotoSlider;
