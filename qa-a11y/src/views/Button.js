import Button from '@enact/moonstone/Button';
import Divider from '@enact/moonstone/Divider';
import IconButton from '@enact/moonstone/IconButton';
import React from 'react';
import Toggleable from '@enact/ui/Toggleable'
import ToggleButton from '@enact/moonstone/ToggleButton';

const StatefulButton = Toggleable({toggle: 'onClick', prop: 'selected'}, Button);
const StatefulIconButton = Toggleable({toggle: 'onClick', prop: 'selected'}, IconButton);
const StatefulToggleButton = Toggleable({toggle: 'onClick', prop: 'selected'}, ToggleButton);

const ButtonView = () => (
	<div>
		<Divider>Default Buttons</Divider>
		<Button aria-label="default button">Button</Button>
		<StatefulButton color="red" aria-label="red button">Red Button</StatefulButton>
		<StatefulButton color="blue" aria-label="blue button">Blue Button</StatefulButton>
		<StatefulButton disabled aria-label="disabled button" aria-disabled="true">Disabled Button</StatefulButton>
		<Divider>Icon Buttons</Divider>
		<StatefulIconButton aria-label="play button">play</StatefulIconButton>
		<StatefulIconButton aria-label="plus button">plus</StatefulIconButton>
		<Divider>Toggle Buttons</Divider>
		<StatefulToggleButton aria-label="toggle button">Toggle Button</StatefulToggleButton>
		<StatefulToggleButton disabled aria-label="disabled toggle button" aria-disabled="true">Disabled Toggle Button</StatefulToggleButton>
		<StatefulToggleButton toggleOffLabel="Off" toggleOnLabel="On" aria-label="on off button" />
	</div>
);

export default ButtonView;
