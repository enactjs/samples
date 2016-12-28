import React from 'react';
import BodyText from '@enact/moonstone/BodyText';
import Image from '@enact/moonstone/Image';
import Slider from '@enact/moonstone/Slider';
import Picker from '@enact/moonstone/Picker';
import Changeable from '@enact/ui/Changeable';
import css from './ProfilePhotoPicker.less';

const StatefulPicker = Changeable(Picker);

const imageURLs = [
	'../images/mural.jpeg',
	'../images/violin.jpeg',
	'../images/car.jpeg',
	'../images/city.jpeg',
	'../images/space-shuttle.jpg'
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
			profilePhoto: imageURLs[0],
			photoPosition: -50,
			pickerIndex: 0
		};
	}

	handlePickerChange = (event) => {
		this.setState({
			profilePhoto: imageURLs[event.value],
			pickerIndex: event.value
		});
	}

	handleSliderChange = (event) => {
		this.setState({photoPosition: event.value});
	}

	render = () => (
		<div className={css.profilePhotoPicker}>
			<Image className={css.profilePhoto} src={this.state.profilePhoto} style={{backgroundPosition: this.state.photoPosition + 'px'}} />

			<Slider className={css.slider} min={-100} max={0} value={this.state.photoPosition} onChange={this.handleSliderChange} />

			<BodyText centered>{imageNames[this.state.pickerIndex]} :: {this.state.pickerIndex + 1} of {imageURLs.length} photos</BodyText>

			<StatefulPicker onChange={this.handlePickerChange} width="large" >
				{imageComponents}
			</StatefulPicker>
		</div>
	)
}

export default ProfilePhotoPicker;
