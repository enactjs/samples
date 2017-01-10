import React from 'react';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import css from './MainPanel.less';

import PhotoPickerContainer from '../containers/PhotoPickerContainer';
import PhotoPreviewContainer from '../containers/PhotoPreviewContainer';
import PhotoSliderContainer from '../containers/PhotoSliderContainer';
import FooterContainer from '../containers/FooterContainer';

const MainPanel = kind({
	name: 'MainPanel',

	render: () => (
		<Panel>
			<Header title="Profile Photo" titleBelow="Choose your profile picture" type="compact" preserveCase />
			<div className={css.profilePhotoPicker}>
				<PhotoPreviewContainer />
				<PhotoSliderContainer />
				<PhotoPickerContainer />
			</div>
			<FooterContainer />
		</Panel>
	)
});

export default MainPanel;
