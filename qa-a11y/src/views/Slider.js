import Changeable from '@enact/ui/Changeable';
import Divider from '@enact/moonstone/Divider';
import IncrementSlider from '@enact/moonstone/IncrementSlider';
import React from 'react';
import Slider from '@enact/moonstone/Slider';

const ChangebaleSlider = Changeable({mutable: true}, Slider);
const ChangebaleIncrementSlider = Changeable({mutable: true}, IncrementSlider);

const SliderView = () => (
	<div>
		<Divider>Default Sliders</Divider>
		<ChangebaleSlider />
		<Divider>IncrementSlider</Divider>
		<ChangebaleIncrementSlider />
	</div>
);

export default SliderView;
