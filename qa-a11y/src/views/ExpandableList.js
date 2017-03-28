import Divider from '@enact/moonstone/Divider';
import ExpandableList from '@enact/moonstone/ExpandableList';
import React from 'react';
import Changeable from '@enact/ui/Changeable';

const List = Changeable(ExpandableList);

const ExpandableListView = () => (
	<div>
		<Divider>Default ExpandableLists</Divider>
		<List
			noneText="nothing selected"
			title="title"
		>
			{['option1', 'option2', 'option3']}
		</List>
	</div>
);

export default ExpandableListView;
