import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import Slider from '@enact/moonstone/Slider';
import css from './componentStyles.less';

const PhotoSlider = kind({
	name: 'PhotoSlider',

	propTypes: {
		setPreview: PropTypes.func.isRequired,
		size: PropTypes.number.isRequired
	},

	styles: {
		css,
		className: 'slider'
	},

	computed: {
		onChange: ({setPreview}) => {
			return (ev) => {
				setPreview({
					size: ev.value
				});
			};
		}
	},

	render: ({onChange, size, ...rest}) => {
		delete rest.setPreview;

		return (
			<Slider {...rest} min={100} max={200} value={size} onChange={onChange} />
		);
	}
});

export default PhotoSlider;
