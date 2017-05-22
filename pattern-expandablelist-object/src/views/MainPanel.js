import React from 'react';
import kind from '@enact/core/kind';
import ExpandableList from '@enact/moonstone/ExpandableList';
import {Panel, Header} from '@enact/moonstone/Panels';

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
