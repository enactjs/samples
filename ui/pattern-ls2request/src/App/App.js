import Button from '@enact/ui/Button';
import Item from '@enact/ui/Item';
import PropTypes from 'prop-types';
import {useCallback, useEffect} from 'react';
import {connect} from 'react-redux';

import {getSystemSettings, setSystemSettings, setSystemSettingsSubscribed} from '../actions';

import css from './App.module.less';

const App = ({brightness, eyeComfortMode, dispatch}) => {
	useEffect(() => {
		if (typeof window.PalmSystem !== 'undefined') {
			dispatch(getSystemSettings({
				category: 'picture',
				key: 'brightness'
			}));

			// This LS2Request is WITH subscription
			dispatch(getSystemSettings({
				category: 'picture',
				key: 'eyeComfortMode',
				subscribe: true
			}));
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	const handleDecreaseBrightness = useCallback(() => {
		let brightnessDec = Number(brightness);
		brightnessDec = brightnessDec !== 0 ? brightnessDec - 10 : brightnessDec;
		return dispatch(setSystemSettings({
			category: 'picture',
			settings: {
				brightness: String(brightnessDec)
			}
		}));
	}, [brightness, dispatch]);
	const handleIncreaseBrightness = useCallback(() => {
		let brightnessInc = Number(brightness);
		brightnessInc = brightnessInc !== 100 ? brightnessInc + 10 : brightnessInc;
		return dispatch(setSystemSettings({
			category: 'picture',
			settings: {
				brightness: String(brightnessInc)
			}
		}));
	}, [brightness, dispatch]);
	// if subscribed, we don't need to invoke redux chain as subscribed instance will invoke the data flow
	const onEyeComfortModeToggle = useCallback(() => setSystemSettingsSubscribed({
		category: 'picture',
		settings: {
			'eyeComfortMode': eyeComfortMode === 'on' ? 'off' : 'on'
		}
	}), [eyeComfortMode]);
	const checkSystem = () => {
		if (typeof window === 'undefined' || typeof window.PalmSystem === 'undefined') {
			return <div>This test will only function correctly on webOS systems!</div>;
		}
	};

	if (typeof window.PalmSystem === 'undefined') {
		return <div className={css.main}>This test will only function correctly on webOS systems!</div>;
	}

	return (
		<div className={css.main}>
			{checkSystem()}
			<Item>
				Brightness : {brightness}
			</Item>
			<Button className={css.button} onClick={handleDecreaseBrightness}>Decrease</Button>
			<Button className={css.button} onClick={handleIncreaseBrightness}>Increase</Button>
			<Item>
				Eye Comfort Mode : {eyeComfortMode}
			</Item>
			<Button className={css.button} onClick={onEyeComfortModeToggle}>Toggle</Button>
		</div>
	);

};

App.propTypes = {
	dispatch: PropTypes.func.isRequired,
	brightness: PropTypes.string,
	eyeComfortMode: PropTypes.string
};

const mapStateToProps = ({systemSettings}) => {
	const {brightness, eyeComfortMode} = systemSettings;
	return {
		brightness,
		eyeComfortMode
	};
};

export default connect(mapStateToProps)(App);
