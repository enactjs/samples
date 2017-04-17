import Divider from '@enact/moonstone/Divider';
import IncrementSlider from '@enact/moonstone/IncrementSlider';
import React from 'react';
import Slider from '@enact/moonstone/Slider';

const SliderView = () => (
	<div>
		<Divider>Default Sliders</Divider>
		<Slider />
		<Divider>IncrementSlider</Divider>
		<IncrementSlider />
	</div>
);

export default SliderView;
