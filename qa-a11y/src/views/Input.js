import Divider from '@enact/moonstone/Divider';
import Input from '@enact/moonstone/Input';
import ExpandableInput from '@enact/moonstone/ExpandableInput';
import React from 'react';

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
					<Input />
				</li>
				<li>
					<Input disabled />
				</li>
				<li>
					<Input iconAfter="lock" />
				</li>
				<li>
					<Input iconBefore="plus" />
				</li>
			</ul>
		</div>
		<div style={inputColumn}>
			<Divider>Expandable Input</Divider>
			<ExpandableInput title="No none text" />
			<ExpandableInput title="No input" noneText="Nothing inputted" />
			<ExpandableInput title="Expandable Input" />
			<Divider>Aria-labeled Input</Divider>
			<Input iconBefore="plus" aria-label="add input" />
			<ExpandableInput title="Expandable Input" aria-label="expandable input" />
		</div>
	</div>
);

export default InputView;
