import React from 'react';
import kind from '@enact/core/kind';
import Selectable from '@enact/ui/Selectable';
import SelectableItem from '@enact/moonstone/SelectableItem';
import Group from '@enact/ui/Group';

const SelectableGroup = Selectable(Group);


const SourcePicker = kind({
	name: 'SourcePicker',
	render: ({...rest}) => (
		<div>
			<SelectableGroup
				childComponent={SelectableItem}
				select="radio"
				selectedProp="selected"
				defaultSelected={0}
				onSelect={(evt) => console.log(evt) }>
				{['All', 'Antenna', 'Cable']}
			</SelectableGroup>
		</div>
	)
});

export default SourcePicker;