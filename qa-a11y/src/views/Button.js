import Button from '@enact/moonstone/Button';
import Divider from '@enact/moonstone/Divider';
import IconButton from '@enact/moonstone/IconButton';
import React from 'react';
import Toggleable from '@enact/ui/Toggleable';
import ToggleButton from '@enact/moonstone/ToggleButton';

const StatefulButton = Toggleable({toggle: 'onClick', prop: 'selected'}, Button);
const StatefulIconButton = Toggleable({toggle: 'onClick', prop: 'selected'}, IconButton);
const StatefulToggleButton = Toggleable({toggle: 'onClick', prop: 'selected'}, ToggleButton);

const ButtonView = () => (
	<div>
		<Divider>Default Buttons</Divider>
		<Button />
		<Button>Button</Button>
		<StatefulButton color="red">Red Button</StatefulButton>
		<StatefulButton color="blue">Blue Button</StatefulButton>
		<StatefulButton disabled>Disabled Button</StatefulButton>
		<Divider>Icon Buttons</Divider>
		<StatefulIconButton>play</StatefulIconButton>
		<StatefulIconButton>plus</StatefulIconButton>
		<Divider>Toggle Buttons</Divider>
		<StatefulToggleButton>Toggle Button</StatefulToggleButton>
		<StatefulToggleButton disabled>Disabled Toggle Button</StatefulToggleButton>
		<StatefulToggleButton toggleOffLabel="Close" toggleOnLabel="Open" />
		<Divider>Aria-labeled Buttons</Divider>
		<StatefulButton color="yellow" aria-label="yellow button">yellow Button</StatefulButton>
		<StatefulIconButton aria-label="plug icon button">plug</StatefulIconButton>
		<StatefulToggleButton toggleOffLabel="Off" toggleOnLabel="On" aria-label="Toggle button" />
	</div>
);

export default ButtonView;
