import Button from '@enact/moonstone/Button';
import Dialog from '@enact/moonstone/Dialog';
import React from 'react';

class DialogView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			open: false
		}
	}

	handleOpen = () => {
		this.setState({open: true});
	}

	handleClose = () => {
		this.setState({open: false});
	}

	render () {
		const {open} = this.state;

		return (
			<div>
				<Button onClick={this.handleOpen}>Dialog</Button>
				<Dialog
					onClose={this.handleClose}
					open={open}
				>
					<title>{`You've been watching TV for a very long time so let's do a quick check-in.`}</title>
					<titleBelow>This TV has been active for 10 hours.</titleBelow>
					<span>Perhaps it is time to take a break and get some fresh air. There is a nice coffee shop around the corner</span>
					<buttons>
						<Button onClick={this.handleClose}>Go Get A Coffee</Button>
						<Button onClick={this.handleClose}>Keep Watching TV</Button>
					</buttons>
				</Dialog>
			</div>
		);
	}
}

export default DialogView;
