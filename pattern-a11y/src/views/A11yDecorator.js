import A11yDecorator from '@enact/ui/A11yDecorator/A11yDecorator.js';
import Button from '@enact/moonstone/Button';
import Divider from '@enact/moonstone/Divider';
import React, {Component} from 'react';

const A11yButton = A11yDecorator(Button);

class A11yDecoratorView extends Component {
	render = () => (
		<div>
			<section style={{width: '50%', float: 'left'}}>
				<Divider>Button Examples</Divider>
				<div>
					<p><strong>accessibilityPreHint=Button Examples</strong></p>
					<A11yButton accessibilityPreHint='Button Examples'>Easy</A11yButton>
					<p><strong>accessibilityHint=Hint</strong></p>
					<A11yButton accessibilityHint='Hint' backgroundOpacity='translucent'>Medium</A11yButton>
					<p><strong>aria-label=accessibility</strong></p>
					<A11yButton aria-label='accessibility' backgroundOpacity='transparent'>Hard</A11yButton>
				</div>
			</section>
		</div>
	)
}

export default A11yDecoratorView;
