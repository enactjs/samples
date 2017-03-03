import DayPicker from '@enact/moonstone/DayPicker';
import Divider from '@enact/moonstone/Divider';
import React from 'react';
import Selectable from '@enact/ui/Selectable';

const SelectableDayPicker = Selectable(DayPicker);

const DayPickerView = () => (
	<div>
		<Divider>Default DayPickers</Divider>
		<SelectableDayPicker
			noneText="none"
			title="Day Picker"
		/>
	</div>
);

export default DayPickerView;
