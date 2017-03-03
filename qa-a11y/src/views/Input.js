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
				<StatefulInput role="input" />
			</li>
			<li>
				<StatefulInput disabled aria-disabled="true" role="input" />
			</li>
			<li>
				<StatefulInput iconAfter="lock" aria-label="lock input" role="input" />
			</li>
			<li>
				<StatefulInput iconBefore="plus" aria-label="plus input" role="input" />
			</li>
		</ul>
		<Divider>Expandable Input</Divider>
		<StatefulExpandableInput role="input" />
		<StatefulExpandableInput noneText="Nothing inputted" role="input" />
		<StatefulExpandableInput title="Expandable Input" role="input" />
	</div>
);

export default InputView;
