import A11yDecorator from '@enact/ui/A11yDecorator/A11yDecorator.js';
import Button from '@enact/moonstone/Button';
import Changeable from '@enact/ui/Changeable';
import Divider from '@enact/moonstone/Divider';
import React, {Component} from 'react';
import Slider from '@enact/moonstone/Slider';

const
	A11yButton = A11yDecorator(Button),
	ChangeableSlider = Changeable(Slider);

class A11yDecoratorView extends Component {
	constructor () {
		super();
		this.state = {
			sliderVal: 10
		};
	}

	sliderChangeHandler = (val) => {
		this.setState({
			sliderVal: val.value
		});
	}

	render = () => (
		<div>
			<section style={{width: '50%', float: 'left'}}>
				<Divider>Button Examples</Divider>
				<div>
					<p><strong>role=button, accessibilityPreHint=A11y_button</strong></p>
					<A11yButton role={'button'} accessibilityPreHint={'A11y_button'}>Easy</A11yButton>
					<p><strong>role=button, accessibilityHint=A11y_button</strong></p>
					<A11yButton role={'button'} accessibilityHint='A11y_button' backgroundOpacity='translucent'>Medium</A11yButton>
					<p><strong>role=button, aria-label=A11y_button</strong></p>
					<A11yButton role={'button'} aria-label={'A11y_button'} backgroundOpacity='transparent'>Hard</A11yButton>
				</div>
			</section>

			<section style={{width: '50%', float: 'right'}}>
				<Divider>Slider Example</Divider>
				<div>
					<p><strong>role=slider, aria-valuenow=this.state.sliderVal</strong></p>
					<ChangeableSlider role={'slider'} aria-valuenow={this.state.sliderVal} min={0} max={100} value={this.state.sliderVal} step={1} onChange={this.sliderChangeHandler} />
				</div>
			</section>
		</div>
	)
}

export default A11yDecoratorView;
