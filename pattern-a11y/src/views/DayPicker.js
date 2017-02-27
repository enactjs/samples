import DayPicker from '@enact/moonstone/DayPicker';
import Selectable from '@enact/ui/Selectable';
import React from 'react';

const SelectableDayPicker = Selectable(DayPicker);

class DayPickerView extends React.Component {
	constructor () {
		super();
	}

	render = () => (
		<SelectableDayPicker
			title='Day Picker'
			noneText='none'
		/>
	)
}

export default DayPickerView;
