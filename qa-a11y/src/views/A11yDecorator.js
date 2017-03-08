import A11yDecorator from '@enact/ui/A11yDecorator/A11yDecorator.js';
import Button from '@enact/moonstone/Button';
import Divider from '@enact/moonstone/Divider';
import React from 'react';

const A11yButton = A11yDecorator(Button);

const A11yDecoratorView = () => (
	<div>
		<Divider>Button Examples</Divider>
		<p><strong>accessibilityPreHint=Button Examples</strong></p>
		<A11yButton accessibilityPreHint="Button Examples">Easy</A11yButton>
		<p><strong>accessibilityHint=Hint</strong></p>
		<A11yButton accessibilityHint="Hint" backgroundOpacity="translucent">Medium</A11yButton>
		<p><strong>aria-label=accessibility</strong></p>
		<A11yButton aria-label="accessibility" backgroundOpacity="transparent">Hard</A11yButton>
	</div>
);

export default A11yDecoratorView;
