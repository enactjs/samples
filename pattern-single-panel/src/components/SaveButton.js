import Button from '@enact/moonstone/Button';
import Popup from '@enact/moonstone/Popup';
import PropTypes from 'prop-types';
import React from 'react';

class SaveButton extends React.Component {
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
			<Popup open={this.state.saved} onClose={this.handleOnClose} showCloseButton>
				Saved!
			</Popup>
		</div>
	);
}

export default SaveButton;
