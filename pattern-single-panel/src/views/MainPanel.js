import {Cell, Column} from '@enact/ui/Layout';
import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import React from 'react';

import ProfilePhotoPicker from '../components/ProfilePhotoPicker';
import SaveButton from '../components/SaveButton';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Profile Photo" titleBelow="Choose your profile picture" type="compact" casing="preserve" />
			<Column>
				<Cell component={ProfilePhotoPicker} />
				<Cell component={SaveButton} />
			</Column>
		</Panel>
	)
});

export default MainPanel;
