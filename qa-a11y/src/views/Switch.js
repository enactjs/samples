import Divider from '@enact/moonstone/Divider';
import React from 'react';
import {Switch as SwitchBase} from '@enact/moonstone/Switch';
import Toggleable from '@enact/ui/Toggleable';

const Switch = Toggleable({toggle: 'onClick', prop: 'selected'}, SwitchBase);

const SwitchView = () => (
	<section>
		<Divider>Default switch</Divider>
		<Switch role="switch" />
		<Switch disabled aria-disabled="true" role="switch" />
	</section>
);

export default SwitchView;
