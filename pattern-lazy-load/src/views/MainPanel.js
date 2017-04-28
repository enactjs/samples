import React from 'react';
import {Panel, Header} from '@enact/moonstone/Panels';
import Spotlight from '@enact/spotlight';
import LazilyLoad, {importLazy} from '../components/LazilyLoad';
import Popup from '@enact/moonstone/Popup';
import Button from '@enact/moonstone/Button';

class ClosePopup extends React.Component {
	render () {
		const {onClick, ...rest} = this.props;

		return(
				<Panel {...rest}>
					<Header title='Close Popup' />
					<Button onClick={onClick}>A</Button>
				</Panel>
		);
	}
}

export default ClosePopup;