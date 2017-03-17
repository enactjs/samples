import React from 'react';
import kind from '@enact/core/kind';
import SaveButton from '../components/SaveButton';
import {Panel, Header} from '@enact/moonstone/Panels';
import ProfilePhotoPicker from '../components/ProfilePhotoPicker';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Profile Photo" titleBelow="Choose your profile picture" type="compact" preserveCase />
			<ProfilePhotoPicker />
			<SaveButton />
		</Panel>
	)
});

export default MainPanel;
