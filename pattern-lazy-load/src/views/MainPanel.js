import React from 'react';
import {Panel, Header} from '@enact/moonstone/Panels';
import Spotlight from '@enact/spotlight';
import LazilyLoad, {importLazy} from '../components/LazilyLoad';

class ClosePopup extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isPopupShow: false
		};
	}

	componentWillMount () {
		Spotlight.setPointerMode(false);
	}

	openPopup = () => {
		this.setState({
			isPopupShow: true
		})
	}

	closePopup = () => {
		this.setState({
			isPopupShow: false
		})
	}

	render () {
		const {onClick, ...rest} = this.props;

		return(
				<Panel {...rest}>
					<Header title='Close Popup' />
						<LazilyLoad modules={{
							Popup: () => importLazy(import('@enact/moonstone/Popup')),
							Button: () => importLazy(import('@enact/moonstone/Button')),
						}}>
							{({Popup, Button}) => (
								<div>
									<Button onClick={this.openPopup}>Open Popup</Button>
									<Button onClick={onClick}>A</Button>
									<Button>B</Button>
									<Popup
										open={this.state.isPopupShow}
										onClose={this.closePopup}
										showCloseButton
									>
										<div>This is Popup</div>
										<br />
										<Button onClick={this.closePopup}>ok</Button>
										<Button onClick={this.closePopup}>cancel</Button>
									</Popup>
								</div>
							)}
						</LazilyLoad>
				</Panel>
		);
	}
}

export default ClosePopup;