import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import Slider from '@enact/moonstone/Slider';
import css from './componentStyles.less';

const PhotoSlider = kind({
	name: 'PhotoSlider',

	propTypes: {
		position: PropTypes.number.isRequired,
		setPreview: PropTypes.func.isRequired
	},

	styles: {
		css,
		className: 'slider'
	},

	computed: {
		onChange: ({setPreview}) => {
			return (ev) => {
				setPreview({
					position: ev.value
				});
			};
		}
	},

	render: ({onChange, position, ...rest}) => {
		delete rest.setPreview;

		return (
			<Slider {...rest} min={-100} max={0} value={position} onChange={onChange} />
		);
	}
});

export default PhotoSlider;
