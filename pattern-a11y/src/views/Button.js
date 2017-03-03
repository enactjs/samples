import React from 'react';
import Toggleable from '@enact/ui/Toggleable'

import Button from '@enact/moonstone/Button';
import Divider from '@enact/moonstone/Divider';
import IconButton from '@enact/moonstone/IconButton';
import ToggleButton from '@enact/moonstone/ToggleButton';

const StatefulButton = Toggleable({toggle: 'onClick', prop: 'selected'}, Button);
const StatefulIconButton = Toggleable({toggle: 'onClick', prop: 'selected'}, IconButton);
const StatefulToggleButton = Toggleable({toggle: 'onClick', prop: 'selected'}, ToggleButton);

class DayPickerView extends React.Component {
	constructor () {
		super();
	}

	render = () => (
		<section>
			<Divider>Default Buttons</Divider>
			<Button>Button</Button>
			<StatefulButton color="red">Red Button</StatefulButton>
			<StatefulButton color="blue">Blue Button</StatefulButton>
			<StatefulButton disabled>Disabled Button</StatefulButton>
			<Divider>Icon Buttons</Divider>
			<StatefulIconButton>play</StatefulIconButton>
			<StatefulIconButton>plus</StatefulIconButton>
			<Divider>Toggle Buttons</Divider>
			<StatefulToggleButton>ToggleButton</StatefulToggleButton>
			<StatefulToggleButton toggleOffLabel="Off" toggleOnLabel="On" />
		</section>
	)
}

export default DayPickerView;
