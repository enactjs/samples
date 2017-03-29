import Button from '@enact/moonstone/Button';
import React from 'react';

const TooltipDecoratorView = () => (
	<div>
		<Button
			style={{position: 'absolute', left: '0'}}
			tooltipPosition="below right"
			tooltipText="I'm a left tooltip."
		>
			Left Tooltip
		</Button>

		<Button
			style={{position: 'absolute', right: '0'}}
			tooltipPosition="below left"
			tooltipText="I'm a right tooltip."
		>
			Right Tooltip
		</Button>

		<Button
			style={{position: 'absolute', bottom: '0', left: '0'}}
			tooltipPosition="above right"
			tooltipText="I'm a left floating tooltip."
		>
			Item With Left Floating Tooltip
		</Button>

		<Button
			style={{position: 'absolute', bottom: '0', right: '0'}}
			tooltipPosition="above left"
			tooltipText="I'm a right floating tooltip."
		>
			Item With Right Floating Tooltip
		</Button>
	</div>
);

export default TooltipDecoratorView;
