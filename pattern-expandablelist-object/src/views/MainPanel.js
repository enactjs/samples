import ExpandableList from '@enact/moonstone/ExpandableList';
import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import React from 'react';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title={props.title} />
			<ExpandableList
				noneText={'nothing selected'}
				select={'multiple'}
				title={'ExpandableList with Data in Object format'}
			>
				{[
					{disabled:false, children: 'option1'},
					{disabled:false, children: 'option2'},
					{disabled:true, children: 'option3'}
				]}
			</ExpandableList>
		</Panel>
	)
});

export default MainPanel;
