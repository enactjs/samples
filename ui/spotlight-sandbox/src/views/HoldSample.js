import {useCallback, useEffect, useRef, useState} from 'react';

import HoldButton from '../components/HoldButton';

import css from './HoldSample.module.less';

const idleMessages = {
	hold: 'waiting for hold events...',
	pulse: 'waiting for pulse events...',
	other: 'waiting for other events...'
};

const holdConfig = {
	frequency: 200,
	events: [
		{name: 'hold', time: 200},
		{name: 'longpress', time: 1000},
		{name: 'reallylongpress', time: 2000}
	]
};

const HoldSample = () => {
	const [holdStatus, setHoldStatus] = useState(idleMessages.hold);
	const [pulseStatus, setPulseStatus] = useState(idleMessages.pulse);
	const [otherStatus, setOtherStatus] = useState(idleMessages.other);
	const resetTimers = useRef({});

	const report = useCallback((action, display) => {
		const setters = {
			hold: setHoldStatus,
			pulse: setPulseStatus,
			other: setOtherStatus
		};

		setters[display](`Select and Hold Me: ${action}`);

		clearTimeout(resetTimers.current[display]);
		resetTimers.current[display] = setTimeout(() => {
			setters[display](idleMessages[display]);
		}, 2000);
	}, []);

	useEffect(() => () => {
		Object.values(resetTimers.current).forEach(clearTimeout);
	}, []);

	const handleHeld = useCallback((ev) => {
		report(ev.name, 'hold');
	}, [report]);

	const handlePulse = useCallback((ev) => {
		report(`pulsing (${Math.round(ev.time)})`, 'pulse');
	}, [report]);

	const handleReleased = useCallback(() => {
		report('released', 'hold');
	}, [report]);

	const handleTapped = useCallback(() => {
		report('tapped', 'other');
	}, [report]);

	return (
		<div className={css.holdSample}>
			<p className={css.description}>
				Focus the button with arrow keys, then press and hold Enter to trigger hold events.
				Quick press Enter to tap. Hold events are provided by @enact/ui/Touchable on a
				Spottable control.
			</p>
			<div className={css.demoPanel}>
				<HoldButton
					holdConfig={holdConfig}
					onHold={handlePulse}
					onHoldEnd={handleReleased}
					onHoldStart={handleHeld}
					onTap={handleTapped}
				>
					Select and Hold Me
				</HoldButton>
				<ul className={css.statusList}>
					<li className={css.statusItem}>
						<em>{holdStatus}</em>
					</li>
					<li className={css.statusItem}>
						<em>{pulseStatus}</em>
					</li>
					<li className={css.statusItem}>
						<em>{otherStatus}</em>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default HoldSample;
