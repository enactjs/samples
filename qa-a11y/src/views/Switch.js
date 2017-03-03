import Divider from '@enact/moonstone/Divider';
import React from 'react';
import {Switch as SwitchBase} from '@enact/moonstone/Switch';
import Toggleable from '@enact/ui/Toggleable';

const Switch = Toggleable({toggle: 'onClick', prop: 'selected'}, SwitchBase);

const SwitchView = () => (
	<section>
		<Divider>Default switches</Divider>
		<Switch />
		<Switch disabled  />
		<Switch aria-label="switch" />
	</section>
);

export default SwitchView;
