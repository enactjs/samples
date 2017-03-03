import Divider from '@enact/moonstone/Divider';
import Input from '@enact/moonstone/Input';
import ExpandableInput from '@enact/moonstone/ExpandableInput';
import React from 'react';
import Changeable from '@enact/ui/Changeable'

const StatefulInput = Changeable({toggle: 'onClick', prop: 'selected'}, Input);
const StatefulExpandableInput = Changeable({toggle: 'onClick', prop: 'selected'}, ExpandableInput);

const InputView = () => (
	<div>
		<Divider>Default Input</Divider>
		<ul>
			<li>
				<StatefulInput />
			</li>
			<li>
				<StatefulInput disabled />
			</li>
			<li>
				<StatefulInput iconAfter="lock" />
			</li>
			<li>
				<StatefulInput iconBefore="plus" />
			</li>
		</ul>
		<Divider>Expandable Input</Divider>
		<StatefulExpandableInput />
		<StatefulExpandableInput noneText="Nothing inputted" />
		<StatefulExpandableInput title="Expandable Input" />
		<Divider>Aria-labeled Input</Divider>
		<StatefulInput iconBefore="plus" aria-label="add input" />
		<StatefulExpandableInput title="Expandable Input" aria-label="expandable input" />
	</div>
);

export default InputView;
