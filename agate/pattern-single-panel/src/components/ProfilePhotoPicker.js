import BodyText from '@enact/agate/BodyText';
import Image from '@enact/agate/Image';
import Picker from '@enact/agate/Picker';
import Slider from '@enact/agate/Slider';
import {Cell, Column} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {Component} from 'react';

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

class ProfilePhotoPicker extends Component {
	static propTypes = {
		className: PropTypes.string
	};

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
	};

	handleSliderChange = (ev) => {
		if (ev.value) {
			this.setState({photoPosition: ev.value});
		}
	};

	render = () => (
		<Column
			{...this.props}
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
				component={Slider}
				max={0}
				min={-100}
				onChange={this.handleSliderChange}
				shrink
				style={{minWidth: ri.scale(360)}}
				value={this.state.photoPosition}
			/>
			<Cell
				centered
				component={BodyText}
				shrink
				style={{margin: 0}}
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
	);
}

export default ProfilePhotoPicker;
export {imageURLs};
