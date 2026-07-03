import {useCallback, useState} from 'react';

import DraggableControl from '../components/DraggableControl';
import SpottableButton from '../components/SpottableButton';

import css from './SandboxSample.module.less';

const createInitialControls = () => {
	const controls = [];
	let id = 0;

	for (let row = 0; row < 2; row++) {
		for (let column = 0; column < 4; column++) {
			controls.push({
				id: `control-${id++}`,
				left: 141 + column * 141,
				top: 141 * (row + 1)
			});
		}
	}

	return controls;
};

const SandboxSample = () => {
	const [controls, setControls] = useState(createInitialControls);

	const handleAddControl = useCallback(() => {
		setControls((current) => current.concat({
			id: `control-${current.length}`,
			left: 30 + (current.length % 8) * 99,
			top: 393 + Math.floor(current.length / 8) * 99
		}));
	}, []);

	return (
		<div className={css.sandboxSample}>
			<p className={css.description}>
				Draggable spottable controls arranged in a grid. Drag to reposition or use the
				bottom-right corner to resize. Use arrow keys to navigate between controls after
				repositioning them.
			</p>
			<div className={css.demoPanel}>
				<div className={css.toolbar}>
					<SpottableButton onClick={handleAddControl}>Add Control</SpottableButton>
				</div>
				<div className={css.stage}>
					{controls.map(({id, left, top}, index) => (
						<DraggableControl
							key={id}
							label={index + 1}
							initialLeft={left}
							initialTop={top}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default SandboxSample;
