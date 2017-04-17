import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import Button from '@enact/moonstone/Button';
import LabeledItem from '@enact/moonstone/LabeledItem';
import {getSystemSettings, setSystemSettings, setSystemSettingsSubscribed} from '../actions';

class App extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		eyeComfortMode: PropTypes.string,
		smartPictureMode: PropTypes.string
	};

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
	}));

	// if subscribed, we don't need to invoke redux chain as subscribed instance will invoke the data flow
	onEyeComfortModeToggle = () => setSystemSettingsSubscribed({
		category: 'picture',
		settings: {
			'eyeComfortMode': this.props.eyeComfortMode === 'on' ? 'off' : 'on'
		}
	});

	checkSystem = () => {
		if (typeof window.PalmSystem === 'undefined') {
			return <div>This test will only function correctly on webOS systems!</div>;
		}
	};

	render () {
		const {smartPictureMode, eyeComfortMode} = this.props;

		return (
			<div>
				{this.checkSystem()}
				<LabeledItem label={smartPictureMode}>Smart Picture Mode</LabeledItem>
				<Button onClick={this.onSmartPictureToggle}>Toggle</Button>
				<LabeledItem label={eyeComfortMode}>Eye Comfort Mode</LabeledItem>
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
};

export default connect(mapStateToProps)(MoonstoneDecorator(App));
