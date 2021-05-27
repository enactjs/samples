import Button from '@enact/ui/Button';
import Item from '@enact/ui/Item';
import PropTypes from 'prop-types';
import {Component} from 'react';
import {connect} from 'react-redux';

import {getSystemSettings, setSystemSettings, setSystemSettingsSubscribed} from '../actions';

import css from './App.module.less';

class App extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		eyeComfortMode: PropTypes.string,
		smartPictureMode: PropTypes.string
	};

	componentDidMount () {
		// This LS2Request is WITHOUT subscription
		if (typeof window.PalmSystem !== 'undefined') {
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
		if (typeof window === 'undefined' || typeof window.PalmSystem === 'undefined') {
			return <div>This test will only function correctly on webOS systems!</div>;
		}
	};

	render () {
		const {smartPictureMode, eyeComfortMode} = this.props;
		if (typeof window.PalmSystem === 'undefined') {
			return <div>This test will only function correctly on webOS systems!</div>;
		}

		return (
			<div style={{position: 'absolute', inset: '18px 24px', overflow: 'hidden'}}>
				{this.checkSystem()}
				<Item>
					Smart Picture Mode : {smartPictureMode}
				</Item>
				<Button className={css.button} onClick={this.onSmartPictureToggle}>Toggle</Button>
				<Item>
					Eye Comfort Mode : {eyeComfortMode}
				</Item>
				<Button className={css.button} onClick={this.onEyeComfortModeToggle}>Toggle</Button>
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

export default connect(mapStateToProps)(App);
