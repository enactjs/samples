import {Cell, Column} from '@enact/ui/Layout';
import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import React from 'react';

import car from '../../assets/images/car.jpeg';
import city from '../../assets/images/city.jpeg';
import FooterContainer from '../containers/FooterContainer';
import mural from '../../assets/images/mural.jpeg';
import PhotoPickerContainer from '../containers/PhotoPickerContainer';
import PhotoPreviewContainer from '../containers/PhotoPreviewContainer';
import PhotoSliderContainer from '../containers/PhotoSliderContainer';
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
			<Header title="Profile Photo" titleBelow="Choose your profile picture" type="compact" casing="preserve" />
			<Column
				align="center center"
			>
				<Cell
					component={PhotoPreviewContainer}
					imageURLs={imageURLs}
					shrink
				/>
				<Cell
					component={PhotoSliderContainer}
					shrink
				/>
				<Cell
					component={PhotoPickerContainer}
					imageNames={imageNames}
					imageURLs={imageURLs}
					shrink
				/>
				<Cell
					component={FooterContainer}
					shrink
				/>
			</Column>
		</Panel>
	)
});

export default MainPanel;
