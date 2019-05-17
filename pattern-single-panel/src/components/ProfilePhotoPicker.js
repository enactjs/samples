import BodyText from '@enact/moonstone/BodyText';
import {Cell, Column} from '@enact/ui/Layout';
import Image from '@enact/moonstone/Image';
import Picker from '@enact/moonstone/Picker';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from '@enact/moonstone/Slider';

import car from '../../assets/images/car.jpeg';
import city from '../../assets/images/city.jpeg';
import mural from '../../assets/images/mural.jpeg';
import spaceShuttle from '../../assets/images/space-shuttle.jpg';
import violin from '../../assets/images/violin.jpeg';

import css from './ProfilePhotoPicker.module.less';

const imageURLs = [
	car,
	city,
	mural,
	spaceShuttle,
	violin
];

const imageNames = ['Vintage Car', 'City', 'Mural', 'Space Shuttle', 'Violin'];

const imageComponents = imageURLs.map(url => {
	return (<Image src={url} key={url} />);
});

class ProfilePhotoPicker extends React.Component {
	static propTypes = {
		className: PropTypes.string
	}

	constructor (props) {
		super(props);
		this.state = {
			photoPosition: -100,
			photoIndex: 0
		};
	}

	handlePickerChange = (ev) => {
		this.setState({
			photoIndex: ev.value
		});
	}

	handleSliderChange = (ev) => {
		if (ev.value) {
			this.setState({photoPosition: ev.value});
		}
	}

	render = () => (
		<Column
			align="center center"
		>
			<Cell
				className={css.profilePhoto}
				component={Image}
				shrink
				src={imageURLs[this.state.photoIndex]}
				style={{backgroundPosition: this.state.photoPosition + 'px'}}
			/>
			<Cell
				className={css.slider}
				component={Slider}
				max={0}
				min={-100}
				onChange={this.handleSliderChange}
				shrink
				value={this.state.photoPosition}
			/>
			<Cell
				centered
				component={BodyText}
				shrink
			>
				{imageNames[this.state.photoIndex]} :: {this.state.photoIndex + 1} of {imageURLs.length} photos
			</Cell>
			<Cell
				component={Picker}
				onChange={this.handlePickerChange}
				shrink
				width="large"
			>
				{imageComponents}
			</Cell>
		</Column>
	)
}

export default ProfilePhotoPicker;
export {imageURLs};
