import Changeable from '@enact/ui/Changeable';
import {DatePicker, DatePickerBase} from '@enact/moonstone/DatePicker';
import Divider from '@enact/moonstone/Divider';
import ExpandablePicker from '@enact/moonstone/ExpandablePicker';
import Picker, {PickerBase} from '@enact/moonstone/Picker';
import RangePicker, {RangePickerBase} from '@enact/moonstone/RangePicker';
import React from 'react';
import {TimePicker, TimePickerBase} from '@enact/moonstone/TimePicker';

const StatefulPicker = Changeable(Picker);
StatefulPicker.propTypes = Object.assign({}, PickerBase.propTypes, StatefulPicker.propTypes);
StatefulPicker.defaultProps = Object.assign({}, PickerBase.defaultProps, StatefulPicker.defaultProps);
StatefulPicker.displayName = 'Picker';

const StatefulRangePicker = Changeable(RangePicker);
StatefulRangePicker.propTypes = Object.assign({}, RangePickerBase.propTypes, RangePicker.propTypes);
StatefulRangePicker.defaultProps = Object.assign({}, RangePickerBase.defaultProps, RangePicker.defaultProps);
StatefulRangePicker.displayName = 'RangePicker';
delete StatefulRangePicker.propTypes.value;

const emoticons = ['💥 boom', '😩🖐 facepalm', '🍩 doughnut', '👻 ghost', '💍 ring', '🎮 videogame', '🍌🍌 bananas'];
const ChangeableExpandablePicker = Changeable({value: 2}, ExpandablePicker);
ChangeableExpandablePicker.displayName = 'ExpandablePicker';

const ChangeableDatePicker = Changeable(DatePicker);
ChangeableDatePicker.propTypes = Object.assign({}, DatePicker.propTypes, DatePickerBase.propTypes, {
	onOpen: React.PropTypes.func,
	onClose: React.PropTypes.func,
	open: React.PropTypes.bool,
	value: React.PropTypes.instanceOf(Date)
});
ChangeableDatePicker.defaultProps = Object.assign({}, DatePicker.defaultProps, DatePickerBase.defaultProps);
ChangeableDatePicker.displayName = 'DatePicker';
'year defaultOpen day maxDays maxMonths month onChangeDate onChangeMonth onChangeYear order'
	.split(' ')
	.forEach(prop => {
		delete ChangeableDatePicker.propTypes[prop];
		delete ChangeableDatePicker.defaultProps[prop];
	});

const ChangeableTimePicker = Changeable(TimePicker);
ChangeableTimePicker.propTypes = Object.assign({}, TimePicker.propTypes, TimePickerBase.propTypes, {
	onOpen: React.PropTypes.func,
	onClose: React.PropTypes.func,
	open: React.PropTypes.bool,
	value: React.PropTypes.instanceOf(Date)
});
ChangeableTimePicker.defaultProps = Object.assign({}, TimePicker.defaultProps, TimePickerBase.defaultProps);
ChangeableTimePicker.displayName = 'TimePicker';
'onChangeHour defaultOpen onChangeMeridiem hour onChangeMinute minute meridiem meridiems order'
	.split(' ')
	.forEach(prop => {
		delete ChangeableTimePicker.propTypes[prop];
		delete ChangeableTimePicker.defaultProps[prop];
	});

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
			<div><Divider>Picker</Divider></div>
			<div>
				<StatefulPicker
					orientation="horizontal"
					width="medium"
				>
					{airports}
				</StatefulPicker>
			</div>

			<div><Divider>Joined Picker</Divider></div>
			<div>
				<StatefulPicker
					joined
					orientation="horizontal"
					width="medium"
				>
					{airports}
				</StatefulPicker>
			</div>

			<div><Divider>Vertical Picker</Divider></div>
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
			<div><Divider>RangePicker</Divider></div>
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

			<div><Divider>Joined RangePicker</Divider></div>
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

			<div><Divider>Vertical RangePicker</Divider></div>
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
			<div><Divider>ExpandablePicker</Divider></div>
			<ChangeableExpandablePicker
				open={false}
				title="Favorite Emoji"
				width="medium"
			>
				{emoticons}
			</ChangeableExpandablePicker>

			<div><Divider>DatePicker</Divider></div>
			<ChangeableDatePicker
				noLabels={false}
				noneText="Nothing Selected"
				title="Date"
			/>

			<div><Divider>TimePicker</Divider></div>
			<ChangeableTimePicker
				noLabels={false}
				noneText="Nothing Selected"
				title="Time"
			/>
		</span>
	</div>
)

export default PickerView;
