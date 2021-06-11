import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/sandstone/Panels';
import {Cell, Column} from '@enact/ui/Layout';

import FooterContainer from '../containers/FooterContainer';
import PhotoPickerContainer from '../containers/PhotoPickerContainer';
import PhotoPreviewContainer from '../containers/PhotoPreviewContainer';
import PhotoSliderContainer from '../containers/PhotoSliderContainer';

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
			<Header casing="preserve" subtitle="Choose your profile picture" title="Profile Photo Redux" type="compact" />
			<Column align="center">
				<Cell>
					<Column align="center center">
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
					</Column>
				</Cell>
				<Cell
					component={FooterContainer}
					shrink
				/>
			</Column>
		</Panel>
	)
});

export default MainPanel;
