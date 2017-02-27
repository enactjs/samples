import Changeable from '@enact/ui/Changeable';
import Divider from '@enact/moonstone/Divider';
import IncrementSlider from '@enact/moonstone/IncrementSlider';
import React from 'react';
import Slider from '@enact/moonstone/Slider';

const ChangebaleSlier = Changeable({mutable: true}, Slider);
const ChangebaleIncrementSlier = Changeable({mutable: true}, IncrementSlider);

class SliderView extends React.Component {
	constructor () {
		super();
	}

	render = () => (
		<section>
			<Divider>Default Slider</Divider>
			<ChangebaleSlier/>
			<Divider>IncrementSlider</Divider>
			<ChangebaleIncrementSlier/>
		</section>
	)
}

export default SliderView;
