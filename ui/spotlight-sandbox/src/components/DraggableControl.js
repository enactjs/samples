import Spottable from '@enact/spotlight/Spottable';
import Spotlight from '@enact/spotlight';
import PropTypes from 'prop-types';
import {useCallback, useRef, useState} from 'react';

import css from './DraggableControl.module.less';

const SpottableDiv = Spottable('div');

const CORNER_SIZE = 20;
const DEFAULT_SIZE = 50;

const DraggableControl = ({initialLeft = 0, initialTop = 0, label, ...rest}) => {
	const [position, setPosition] = useState({left: initialLeft, top: initialTop});
	const [size, setSize] = useState({width: DEFAULT_SIZE, height: DEFAULT_SIZE});
	const dragState = useRef(null);

	const handlePointerDown = useCallback((ev) => {
		if (ev.button !== 0) {
			return;
		}

		const bounds = ev.currentTarget.getBoundingClientRect();
		const relativeRight = bounds.right - ev.clientX;
		const relativeBottom = bounds.bottom - ev.clientY;
		const resizing = relativeRight < CORNER_SIZE && relativeBottom < CORNER_SIZE;

		dragState.current = {
			resizing,
			startX: ev.clientX,
			startY: ev.clientY,
			initialLeft: position.left,
			initialTop: position.top,
			initialWidth: size.width,
			initialHeight: size.height
		};

		Spotlight.pause();
		ev.currentTarget.setPointerCapture(ev.pointerId);
	}, [position.left, position.top, size.height, size.width]);

	const handlePointerMove = useCallback((ev) => {
		if (!dragState.current) {
			return;
		}

		const {resizing, startX, startY, initialLeft: startLeft, initialTop: startTop, initialWidth, initialHeight} = dragState.current;
		const dx = ev.clientX - startX;
		const dy = ev.clientY - startY;

		if (resizing) {
			setSize({
				width: Math.max(CORNER_SIZE, initialWidth + dx),
				height: Math.max(CORNER_SIZE, initialHeight + dy)
			});
		} else {
			setPosition({
				left: startLeft + dx,
				top: startTop + dy
			});
		}
	}, []);

	const handlePointerUp = useCallback((ev) => {
		if (!dragState.current) {
			return;
		}

		dragState.current = null;
		Spotlight.resume();

		if (ev.currentTarget.hasPointerCapture(ev.pointerId)) {
			ev.currentTarget.releasePointerCapture(ev.pointerId);
		}
	}, []);

	return (
		<SpottableDiv
			{...rest}
			className={css.control}
			style={{
				left: position.left,
				top: position.top,
				width: size.width,
				height: size.height
			}}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlePointerUp}
		>
			{label}
			<div className={css.corner} />
		</SpottableDiv>
	);
};

DraggableControl.propTypes = {
	initialLeft: PropTypes.number,
	initialTop: PropTypes.number,
	label: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default DraggableControl;
