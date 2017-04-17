import DatePicker from '@enact/moonstone/DatePicker';
import Divider from '@enact/moonstone/Divider';
import ExpandablePicker from '@enact/moonstone/ExpandablePicker';
import Picker from '@enact/moonstone/Picker';
import RangePicker from '@enact/moonstone/RangePicker';
import React from 'react';
import TimePicker from '@enact/moonstone/TimePicker';

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
				<Picker
					orientation="horizontal"
					width="medium"
				>
					{airports}
				</Picker>
			</div>

			<Divider>Joined Picker</Divider>
			<div>
				<Picker
					joined
					orientation="horizontal"
					width="medium"
				>
					{airports}
				</Picker>
			</div>

			<Divider>Vertical Picker</Divider>
			<Picker
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>
			<Picker
				joined
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>
		</span>

		<span style={pickerSpanStyle}>
			<Divider>RangePicker</Divider>
			<div>
				<RangePicker
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
				<RangePicker
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
				<RangePicker
					defaultValue={0}
					max={100}
					min={0}
					orientation="vertical"
					step={5}
					width="medium"
				/>
				<RangePicker
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
			<ExpandablePicker
				open={false}
				title="Favorite Emoji"
				width="medium"
			>
				{emoticons}
			</ExpandablePicker>

			<Divider>DatePicker</Divider>
			<DatePicker
				noLabels={false}
				noneText="Nothing Selected"
				title="Date"
			/>

			<Divider>TimePicker</Divider>
			<TimePicker
				noLabels={false}
				noneText="Nothing Selected"
				title="Time"
			/>
		</span>
	</div>
);

export default PickerView;
