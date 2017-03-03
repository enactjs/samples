import DayPicker from '@enact/moonstone/DayPicker';
import React from 'react';
import Selectable from '@enact/ui/Selectable';

const SelectableDayPicker = Selectable(DayPicker);

const DayPickerView = () => (
	<SelectableDayPicker
		title='Day Picker'
		noneText='none'
	/>
)

export default DayPickerView;
