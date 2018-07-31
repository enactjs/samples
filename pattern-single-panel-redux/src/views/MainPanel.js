import React from 'react';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';

import car from '../../assets/images/car.jpeg';
import city from '../../assets/images/city.jpeg';
import FooterContainer from '../containers/FooterContainer';
import mural from '../../assets/images/mural.jpeg';
import PhotoPickerContainer from '../containers/PhotoPickerContainer';
import PhotoPreviewContainer from '../containers/PhotoPreviewContainer';
import PhotoSliderContainer from '../containers/PhotoSliderContainer';
import spaceShuttle from '../../assets/images/space-shuttle.jpg';
import violin from '../../assets/images/violin.jpeg';

import css from './MainPanel.less';

const imageNames = [
	'mural',
	'violin',
	'car',
	'city',
	'spaceShuttle'
];
const imageURLs = [
	mural,
	violin,
	car,
	city,
	spaceShuttle
];

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Profile Photo" titleBelow="Choose your profile picture" type="compact" casing="preserve" />
			<div className={css.profilePhotoPicker}>
				<PhotoPreviewContainer imageURLs={imageURLs} />
				<PhotoSliderContainer />
				<PhotoPickerContainer
					imageNames={imageNames}
					imageURLs={imageURLs}
				/>
			</div>
			<FooterContainer />
		</Panel>
	)
});

export default MainPanel;
