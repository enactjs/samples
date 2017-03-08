import Divider from '@enact/moonstone/Divider';
import Input from '@enact/moonstone/Input';
import ExpandableInput from '@enact/moonstone/ExpandableInput';
import React from 'react';
import Changeable from '@enact/ui/Changeable'

const StatefulInput = Changeable({toggle: 'onClick', prop: 'value'}, Input);
const StatefulExpandableInput = Changeable({toggle: 'onClick', prop: 'value'}, ExpandableInput);

const inputColumn = {
	display: 'inline-block',
	width: '50%',
	verticalAlign: 'top'
};

const InputView = () => (
	<div>
		<div style={inputColumn}>
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
		</div>
		<div style={inputColumn}>
			<Divider>Expandable Input</Divider>
			<StatefulExpandableInput title="No none text" />
			<StatefulExpandableInput title="No input" noneText="Nothing inputted" />
			<StatefulExpandableInput title="Expandable Input" />
			<Divider>Aria-labeled Input</Divider>
			<StatefulInput iconBefore="plus" aria-label="add input" />
			<StatefulExpandableInput title="Expandable Input" aria-label="expandable input" />
		</div>
	</div>
);

export default InputView;
