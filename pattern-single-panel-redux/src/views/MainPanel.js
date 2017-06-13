import React from 'react';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import css from './MainPanel.less';

import PhotoPickerContainer from '../containers/PhotoPickerContainer';
import PhotoPreviewContainer from '../containers/PhotoPreviewContainer';
import PhotoSliderContainer from '../containers/PhotoSliderContainer';
import FooterContainer from '../containers/FooterContainer';

import car from '../../assets/images/car.jpeg';
import city from '../../assets/images/city.jpeg';
import mural from '../../assets/images/mural.jpeg';
import spaceShuttle from '../../assets/images/space-shuttle.jpg';
import violin from '../../assets/images/violin.jpeg';

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
			<Header title="Profile Photo" titleBelow="Choose your profile picture" type="compact" preserveCase />
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
