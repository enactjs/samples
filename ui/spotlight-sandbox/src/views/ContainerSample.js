import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {useCallback, useState} from 'react';

import SpottableButton from '../components/SpottableButton';

import css from './ContainerSample.module.less';

const Container = SpotlightContainerDecorator('div');

const ContainerSample = () => {
	const [activeContainer, setActiveContainer] = useState(null);

	const handleFocusCapture = useCallback(() => {
		setActiveContainer(Spotlight.getActiveContainer());
	}, []);

	const handleBlurCapture = useCallback((ev) => {
		const layout = ev.currentTarget;

		window.requestAnimationFrame(() => {
			if (!layout.contains(document.activeElement)) {
				setActiveContainer(null);
			}
		});
	}, []);

	return (
		<div className={css.containerSample}>
			<p className={css.description}>
				Nested spotlight containers. Use arrow keys to move between buttons.
				Containers with focused descendants are highlighted.
			</p>
			<div className={css.demoPanel}>
				<div
					className={css.layout}
					onBlurCapture={handleBlurCapture}
					onFocusCapture={handleFocusCapture}
				>
					<Container className={css.container} spotlightId="c1">
						<span className={css.containerLabel}>c1</span>
						<div className={css.controls}>
							<SpottableButton>c1b1</SpottableButton>
							<SpottableButton>c1b2</SpottableButton>
						</div>
					</Container>
					<Container className={css.container} spotlightId="c2">
						<span className={css.containerLabel}>c2</span>
						<div className={css.controls}>
							<SpottableButton>c2b1</SpottableButton>
							<SpottableButton>c2b2</SpottableButton>
							<Container className={`${css.container} ${css.nested}`} spotlightId="c2c1">
								<span className={css.containerLabel}>c2c1</span>
								<div className={css.controls}>
									<SpottableButton>c2c1b1</SpottableButton>
									<SpottableButton>c2c1b2</SpottableButton>
								</div>
							</Container>
						</div>
					</Container>
				</div>
			</div>
			<div aria-live="polite" className={css.statusBar}>
				<span className={css.statusLabel}>Active container</span>
				<code className={css.statusValue}>{activeContainer ?? 'none'}</code>
			</div>
		</div>
	);
};

export default ContainerSample;
