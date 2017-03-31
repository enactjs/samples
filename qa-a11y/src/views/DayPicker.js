import DayPicker from '@enact/moonstone/DayPicker';
import Divider from '@enact/moonstone/Divider';
import React from 'react';
import Changeable from '@enact/ui/Changeable';

const ChangeableDayPicker = Changeable(DayPicker);

const DayPickerView = () => (
	<div>
		<Divider>Default DayPickers</Divider>
		<ChangeableDayPicker
			noneText="none"
			title="Day Picker"
		/>
	</div>
);

export default DayPickerView;
