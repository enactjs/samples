import Changeable from '@enact/ui/Changeable';
import DatePicker from '@enact/moonstone/DatePicker';
import Divider from '@enact/moonstone/Divider';
import ExpandablePicker from '@enact/moonstone/ExpandablePicker';
import Picker from '@enact/moonstone/Picker';
import RangePicker from '@enact/moonstone/RangePicker';
import React from 'react';
import TimePicker from '@enact/moonstone/TimePicker';

const StatefulPicker = Changeable(Picker);
const StatefulRangePicker = Changeable(RangePicker);
const ChangeableExpandablePicker = Changeable(ExpandablePicker);
const ChangeableDatePicker = Changeable(DatePicker);
const ChangeableTimePicker = Changeable(TimePicker);

const emoticons = ['💥 boom', '😩🖐 facepalm', '🍩 doughnut', '👻 ghost', '💍 ring', '🎮 videogame', '🍌🍌 bananas'];
const airports = [
	'San Francisco Airport Terminal Gate 1',
	'Boston Airport Terminal Gate 2',
	'Tokyo Airport Terminal Gate 3',
	'נמל התעופה בן גוריון טרמינל הבינלאומי'
];

const
	pickerSpanStyle = {
		display: 'inline-block',
		width: '30%',
		verticalAlign: 'top'
	},
	expandableSpanStyle = {
		display: 'inline-block',
		width: '40%',
		verticalAlign: 'top'
	};

const PickerView = () => (
	<div>
		<span style={pickerSpanStyle}>
			<Divider>Picker</Divider>
			<div>
				<StatefulPicker
					orientation="horizontal"
					width="medium"
				>
					{airports}
				</StatefulPicker>
			</div>

			<Divider>Joined Picker</Divider>
			<div>
				<StatefulPicker
					joined
					orientation="horizontal"
					width="medium"
				>
					{airports}
				</StatefulPicker>
			</div>

			<Divider>Vertical Picker</Divider>
			<StatefulPicker
				orientation="vertical"
				width="medium"
			>
				{airports}
			</StatefulPicker>
			<StatefulPicker
				joined
				orientation="vertical"
				width="medium"
			>
				{airports}
			</StatefulPicker>
		</span>

		<span style={pickerSpanStyle}>
			<Divider>RangePicker</Divider>
			<div>
				<StatefulRangePicker
					defaultValue={0}
					max={100}
					min={0}
					orientation="horizontal"
					step={5}
					width="medium"
				/>
			</div>

			<Divider>Joined RangePicker</Divider>
			<div>
				<StatefulRangePicker
					defaultValue={0}
					joined
					max={100}
					min={0}
					orientation="horizontal"
					step={5}
					width="medium"
				/>
			</div>

			<Divider>Vertical RangePicker</Divider>
			<div>
				<StatefulRangePicker
					defaultValue={0}
					max={100}
					min={0}
					orientation="vertical"
					step={5}
					width="medium"
				/>
				<StatefulRangePicker
					defaultValue={0}
					joined
					max={100}
					min={0}
					orientation="vertical"
					step={5}
					width="medium"
				/>
			</div>
		</span>

		<span style={expandableSpanStyle}>
			<Divider>ExpandablePicker</Divider>
			<ChangeableExpandablePicker
				open={false}
				title="Favorite Emoji"
				width="medium"
			>
				{emoticons}
			</ChangeableExpandablePicker>

			<Divider>DatePicker</Divider>
			<ChangeableDatePicker
				noLabels={false}
				noneText="Nothing Selected"
				title="Date"
			/>

			<Divider>TimePicker</Divider>
			<ChangeableTimePicker
				noLabels={false}
				noneText="Nothing Selected"
				title="Time"
			/>
		</span>
	</div>
);

export default PickerView;
