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
		return(
				<Panel>
					<Header title='Close Popup' />
						<LazilyLoad modules={{
							Item: () => importLazy(import('@enact/moonstone/Item'))
						}}>
							{({Item}) => (
								<Item>Item</Item>
							)}
						</LazilyLoad>
				</Panel>
		);
	}
}

export default ClosePopup;