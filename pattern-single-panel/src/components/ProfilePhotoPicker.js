import React from 'react';
import BodyText from '@enact/moonstone/BodyText';
import Image from '@enact/moonstone/Image';
import Slider from '@enact/moonstone/Slider';
import Picker from '@enact/moonstone/Picker';
import Changeable from '@enact/ui/Changeable';
import css from './ProfilePhotoPicker.less';
import car from './images/car.jpeg';
import city from './images/city.jpeg';
import mural from './images/mural.jpeg';
import spaceShuttle from './images/space-shuttle.jpg';
import violin from './images/violin.jpeg';

const StatefulPicker = Changeable(Picker);

const imageURLs = [
	car,
	city,
	mural,
	spaceShuttle,
	violin
];

const imageNames = ['Mural', 'Violin', 'Vintage Car', 'City', 'Space Shuttle'];

const imageComponents = imageURLs.map(url => {
	return (<Image src={url} key={url} />);
});

class ProfilePhotoPicker extends React.Component {
	static propTypes = {
		className: React.PropTypes.string
	}

	constructor (props) {
		super(props);
		this.state = {
			photoPosition: -100,
			photoIndex: 0
		};
	}

	handlePickerChange = (event) => {
		this.setState({
			photoIndex: event.value
		});
	}

	handleSliderChange = (event) => {
		this.setState({photoPosition: event.value});
	}

	render = () => (
		<div className={css.profilePhotoPicker}>
			<Image className={css.profilePhoto} src={imageURLs[this.state.photoIndex]} style={{backgroundPosition: this.state.photoPosition + 'px'}} />

			<Slider className={css.slider} min={-100} max={0} value={this.state.photoPosition} onChange={this.handleSliderChange} />

			<BodyText centered>{imageNames[this.state.photoIndex]} :: {this.state.photoIndex + 1} of {imageURLs.length} photos</BodyText>

			<StatefulPicker onChange={this.handlePickerChange} width="large" >
				{imageComponents}
			</StatefulPicker>
		</div>
	)
}

export default ProfilePhotoPicker;

export {imageURLs};
