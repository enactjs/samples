import Button from '@enact/agate/Button';
import Popup from '@enact/agate/Popup';
import PropTypes from 'prop-types';
import {Component} from 'react';

class SaveButton extends Component {
	static propTypes = {
		className: PropTypes.string
	};

	constructor (props) {
		super(props);
		this.state = {
			saved: false
		};
	}

	handleOnSave = () => {
		this.setState({saved: true});
	};

	handleOnClose = () => {
		this.setState({saved: false});
	};

	render = () => (
		<div {...this.props}>
			<Button onClick={this.handleOnSave}>
				Save
			</Button>
			<Popup closeButton onClose={this.handleOnClose} open={this.state.saved}>
				Saved!
			</Popup>
		</div>
	);
}

export default SaveButton;
