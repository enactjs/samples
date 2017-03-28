import DayPicker from '@enact/moonstone/DayPicker';
import Divider from '@enact/moonstone/Divider';
import React from 'react';

const DayPickerView = () => (
	<div>
		<Divider>Default DayPickers</Divider>
		<DayPicker
			noneText="none"
			title="Day Picker"
		/>
	</div>
);

export default DayPickerView;
