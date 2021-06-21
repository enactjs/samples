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
		brightness: PropTypes.string,
		eyeComfortMode: PropTypes.string
	};

	componentDidMount () {
		// This LS2Request is WITHOUT subscription
		if (typeof window.PalmSystem !== 'undefined') {
			this.props.dispatch(getSystemSettings({
				category: 'picture',
				key: 'brightness'
			}));

			// This LS2Request is WITH subscription
			this.props.dispatch(getSystemSettings({
				category: 'picture',
				key: 'eyeComfortMode',
				subscribe: true
			}));
		}
	}

	handleDecreaseBrightness = () => {
		let brightness = Number(this.props.brightness);
		brightness = brightness !== 0 ? brightness - 10 : brightness;
		return this.props.dispatch(setSystemSettings({
			category: 'picture',
			settings: {
				brightness: String(brightness)
			}
		}));
	};

	handleIncreaseBrightness = () => {
		let brightness = Number(this.props.brightness);
		brightness = brightness !== 100 ? brightness + 10 : brightness;
		return this.props.dispatch(setSystemSettings({
			category: 'picture',
			settings: {
				brightness: String(brightness)
			}
		}));
	};

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
		const {brightness, eyeComfortMode} = this.props;
		if (typeof window.PalmSystem === 'undefined') {
			return <div className={css.main}>This test will only function correctly on webOS systems!</div>;
		}

		return (
			<div className={css.main}>
				{this.checkSystem()}
				<Item>
					Brightness : {brightness}
				</Item>
				<Button className={css.button} onClick={this.handleDecreaseBrightness}>Decrease</Button>
				<Button className={css.button} onClick={this.handleIncreaseBrightness}>Increase</Button>
				<Item>
					Eye Comfort Mode : {eyeComfortMode}
				</Item>
				<Button className={css.button} onClick={this.onEyeComfortModeToggle}>Toggle</Button>
			</div>
		);
	}
}

const mapStateToProps = ({systemSettings}) => {
	const {brightness, eyeComfortMode} = systemSettings;
	return {
		brightness,
		eyeComfortMode
	};
};

export default connect(mapStateToProps)(App);
