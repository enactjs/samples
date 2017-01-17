import React from 'react';
import Button from '@enact/moonstone/Button';
import Popup from '@enact/moonstone/Popup';
import css from './SaveButton.less';

class SaveButton extends React.Component {
	static propTypes = {
		className: React.PropTypes.string
	}

	constructor (props) {
		super(props);
		this.state = {
			saved: false
		};
	}

	handleOnSave = () => {
		this.setState({saved: true});
	}

	handleOnClose = () => {
		this.setState({saved: false});
	}

	render = () => (
		<div className={css.saveButton}>
			<Button onClick={this.handleOnSave}>
				Save
			</Button>
			<Popup open={this.state.saved} onClose={this.handleOnClose} showCloseButton>
				<small>
					Saved!
				</small>
			</Popup>
		</div>
	)
}

export default SaveButton;
