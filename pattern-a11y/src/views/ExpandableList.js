import ExpandableList from '@enact/moonstone/ExpandableList';
import Selectable from '@enact/ui/Selectable';
import React from 'react';

const List = Selectable(ExpandableList);

class ExpandableListView extends React.Component {
	constructor () {
		super();
	}

	render = () => (
		<List
			noneText='nothing selected'
			title='title'
		>
			{['option1', 'option2', 'option3']}
		</List>
	)
}

export default ExpandableListView;
