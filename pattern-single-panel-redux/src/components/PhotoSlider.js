import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import Slider from '@enact/moonstone/Slider';

import css from './componentStyles.less';

const PhotoSlider = kind({
	name: 'PhotoSlider',

	propTypes: {
		changePhotoPosition: PropTypes.func.isRequired,
		photoPosition: PropTypes.number.isRequired
	},

	styles: {
		css,
		className: 'slider'
	},

	computed: {
		onChange: ({changePhotoPosition}) => {
			return (ev) => {
				changePhotoPosition(ev.value);
			};
		}
	},

	render: ({onChange, photoPosition, ...rest}) => {
		delete rest.changePhotoPosition;

		return (
			<Slider {...rest} min={-100} max={0} value={photoPosition} onChange={onChange} />
		);
	}
});

export default PhotoSlider;
