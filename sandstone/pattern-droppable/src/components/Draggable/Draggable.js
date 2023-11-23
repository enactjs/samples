import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import {useEffect, useRef} from 'react';

import css from './Draggable.module.less';
/**
 * TBD.
 *
 * @class useDrag
 * @memberof sandstone/TransferList
 * @ui
 * @private
 */
export const Draggable = hoc({}, (config, Wrapped) => {
	let Component = Wrapped;

	const DraggableHOC = ({disabled, ...rest}) => {
		const ref = useRef(null);

		useEffect(() => {
			const element = ref.current.children[0];
			const eventListenerFunc = (ev) => {
				const id = 'drag-' + (new Date()).getTime();
				element.setAttribute('id', id);

				ev.dataTransfer.setData('source', id);
			};

			element.addEventListener('dragstart', eventListenerFunc);

			return () => {
				element.removeEventListener('dragstart', eventListenerFunc);
			};
		}, []);

		return (
			<div ref={ref} className={css.draggable}>
				<Component
					{...rest}
					draggable={!disabled}
					disabled={disabled}
				/>
			</div>
		);
	};

	DraggableHOC.propTypes = {
		disabled: PropTypes.bool
	};

	return DraggableHOC;
});
