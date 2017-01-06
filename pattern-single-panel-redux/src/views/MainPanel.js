import React from 'react';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import ProfilePhotoPicker from '../components/ProfilePhotoPicker';
import FooterContainer from '../containers/FooterContainer';

const MainPanel = kind({
	name: 'MainPanel',

	render: () => (
		<Panel>
			<Header title="Profile Photo" titleBelow="Choose your profile picture" type="compact" preserveCase />
			<ProfilePhotoPicker />
			<FooterContainer />
		</Panel>
	)
});

export default MainPanel;
