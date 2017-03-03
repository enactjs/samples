import ExpandableList from '@enact/moonstone/ExpandableList';
import React from 'react';
import Selectable from '@enact/ui/Selectable';

const List = Selectable(ExpandableList);

const ExpandableListView = () => (
	<List
		noneText='nothing selected'
		title='title'
	>
		{['option1', 'option2', 'option3']}
	</List>
)

export default ExpandableListView;
