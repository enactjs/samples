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
		<Button role="button">Button</Button>
		<StatefulButton color="red" role="button">Red Button</StatefulButton>
		<StatefulButton color="blue" role="button">Blue Button</StatefulButton>
		<StatefulButton disabled role="button" aria-disabled="true">Disabled Button</StatefulButton>
		<Divider>Icon Buttons</Divider>
		<StatefulIconButton role="button">play</StatefulIconButton>
		<StatefulIconButton role="button">plus</StatefulIconButton>
		<Divider>Toggle Buttons</Divider>
		<StatefulToggleButton role="button">Toggle Button</StatefulToggleButton>
		<StatefulToggleButton disabled role="button" aria-disabled="true">Disabled Toggle Button</StatefulToggleButton>
		<StatefulToggleButton toggleOffLabel="Off" toggleOnLabel="On" role="button" />
	</div>
);

export default ButtonView;
