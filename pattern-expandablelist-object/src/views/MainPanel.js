import React from 'react';
import kind from '@enact/core/kind';
import ExpandableList from '@enact/moonstone/ExpandableList';
import {Panel} from '@enact/moonstone/Panels';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<ExpandableList
				noneText={'nothing selected'}
				select={'multiple'}
				title={'ExpandableList with Data in Object format'}
			>
				{[{disabled:false, children: 'option1'}, {disabled:false, children: 'option2'}, {disabled:false, children: 'option3'}]}
			</ExpandableList>
		</Panel>
	)
});

export default MainPanel;
