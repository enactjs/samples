import React from 'react';
import {connect} from 'react-redux';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import Button from '@enact/moonstone/Button';
import LabeledItemBase from '@enact/moonstone/LabeledItem';
import {getSystemSettings, setSystemSettings, setSystemSettingsSubscribed} from '../actions';

class App extends React.Component {
	componentDidMount () {
		// This LS2Request is WITHOUT subscription
		this.props.dispatch(getSystemSettings({
			category: 'picture',
			key: 'smartPictureMode'
		}));

		// This LS2Request is WITH subscription
		this.props.dispatch(getSystemSettings({
			category: 'picture',
			key: 'eyeComfortMode',
			subscribe: true
		}));
	}

	onSmartPictureToggle = () => this.props.dispatch(setSystemSettings({
		category: 'picture',
		settings: {
			smartPictureMode: this.props.smartPictureMode === 'on' ? 'off' : 'on'
		}
	}))

	// if subscribed, we don't need to invoke redux chain as subscribed instance will invoke the data flow
	onEyeComfortModeToggle = () => this.props.dispatch(setSystemSettingsSubscribed({
		category: 'picture',
		settings: {
			'eyeComfortMode': this.props.eyeComfortMode === 'on' ? 'off' : 'on'
		}
	}))

	render () {
		const {smartPictureMode, eyeComfortMode} = this.props;

		return (
			<div>
				<LabeledItemBase label={smartPictureMode}>Smart Picture Mode</LabeledItemBase>
				<Button onClick={this.onSmartPictureToggle}>Toggle</Button>
				<LabeledItemBase label={eyeComfortMode}>Eye Comfort Mode</LabeledItemBase>
				<Button onClick={this.onEyeComfortModeToggle}>Toggle</Button>
			</div>
		);
	}
}

const mapStateToProps = ({systemSettings}) => {
	const {smartPictureMode, eyeComfortMode} = systemSettings;
	return {
		smartPictureMode,
		eyeComfortMode
	};
}

export default connect(mapStateToProps)(MoonstoneDecorator(App));
