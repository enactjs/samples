import Divider from '@enact/moonstone/Divider';
import ExpandableList from '@enact/moonstone/ExpandableList';
import React from 'react';

const ExpandableListView = () => (
	<div>
		<Divider>Default ExpandableLists</Divider>
		<ExpandableList
			noneText="nothing selected"
			title="title"
		>
			{['option1', 'option2', 'option3']}
		</ExpandableList>
	</div>
);

export default ExpandableListView;
