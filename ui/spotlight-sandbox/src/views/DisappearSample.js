import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {useCallback, useLayoutEffect, useRef, useState} from 'react';

import SpottableButton from '../components/SpottableButton';

import css from './DisappearSample.module.less';

const Container = SpotlightContainerDecorator('div');

const DEFAULT_DISAPPEAR_TARGET = 'button02';

const DisappearSample = () => {
	const [button1Disabled, setButton1Disabled] = useState(false);
	const [showInnerButton2, setShowInnerButton2] = useState(true);
	const [showInnerButton3, setShowInnerButton3] = useState(true);
	const [showC11, setShowC11] = useState(true);
	const [hideC11, setHideC11] = useState(false);
	const pendingFocusRef = useRef(false);

	const focusDefaultDisappearTarget = useCallback(() => {
		pendingFocusRef.current = true;
	}, []);

	useLayoutEffect(() => {
		if (pendingFocusRef.current) {
			pendingFocusRef.current = false;
			Spotlight.focus(DEFAULT_DISAPPEAR_TARGET);
		}
	}, [showC11, hideC11]);

	const handleRestore = useCallback(() => {
		window.location.reload();
	}, []);

	const handleDisableButton1 = useCallback(() => {
		setButton1Disabled(true);
	}, []);

	const handleDestroyInnerButton2 = useCallback(() => {
		setShowInnerButton2(false);
	}, []);

	const handleHideInnerButton3 = useCallback(() => {
		setShowInnerButton3(false);
	}, []);

	const handleDestroyAncestor = useCallback(() => {
		focusDefaultDisappearTarget();
		setShowC11(false);
	}, [focusDefaultDisappearTarget]);

	const handleHideAncestor = useCallback(() => {
		focusDefaultDisappearTarget();
		setHideC11(true);
	}, [focusDefaultDisappearTarget]);

	return (
		<div className={css.disappearSample}>
			<p className={css.description}>
				Exercises focus behavior when spottable controls are disabled, destroyed, or hidden.
				&quot;Destroy My Ancestor&quot; and &quot;Hide My Ancestor&quot; move focus to the
				second button above (spotlightId: button02) after the inner container disappears.
			</p>
			<div className={css.demoPanel}>
				<Container className={css.rootContainer} spotlightId="c1">
					<div className={css.topRow}>
						<SpottableButton className={css.cellButton} spotlightId="button01">
							I am first spottable of the app
						</SpottableButton>
						<SpottableButton className={css.cellButton} spotlightId={DEFAULT_DISAPPEAR_TARGET}>
							I am defaultSpotlightDisappear for &quot;Destroy My Ancestor&quot;
						</SpottableButton>
						<SpottableButton className={css.cellButton} onClick={handleRestore}>
							Restore disappeared buttons
						</SpottableButton>
					</div>
					{showC11 ? (
						<Container
							className={`${css.nestedContainer} ${hideC11 ? css.hidden : ''}`}
							spotlightId="c11"
						>
							<Container className={css.innerContainer} spotlightId="c111">
								<div className={css.actionRow}>
									<div className={css.cell}>
										<SpottableButton
											className={css.cellButton}
											disabled={button1Disabled}
											onClick={handleDisableButton1}
										>
											Disable Me
										</SpottableButton>
									</div>
									<div className={css.cell}>
										{showInnerButton2 ? (
											<SpottableButton
												className={css.cellButton}
												onClick={handleDestroyInnerButton2}
											>
												Destroy Me
											</SpottableButton>
										) : null}
									</div>
									<div className={css.cell}>
										<SpottableButton
											className={`${css.cellButton} ${showInnerButton3 ? '' : css.hidden}`}
											onClick={handleHideInnerButton3}
										>
											Hide Me
										</SpottableButton>
									</div>
								</div>
								<div className={css.actionRowSecond}>
									<div className={css.cell}>
										<SpottableButton
											className={css.cellButton}
											onClick={handleDestroyAncestor}
										>
											Destroy My Ancestor
										</SpottableButton>
									</div>
									<div className={css.cell}>
										<SpottableButton
											className={css.cellButton}
											onClick={handleHideAncestor}
										>
											Hide My Ancestor
										</SpottableButton>
									</div>
								</div>
							</Container>
						</Container>
					) : null}
				</Container>
			</div>
		</div>
	);
};

export default DisappearSample;
