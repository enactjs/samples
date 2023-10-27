import hoc from '@enact/core/hoc';
import ForwardRef from '@enact/ui/ForwardRef';

import {useEffect, useRef} from 'react';

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
			const element = ref.current;
			const eventListenerFunc = () => {
				console.log('start');
			};
			//
			// element.addEventListener('dragstart', eventListenerFunc);
			//
			// return () => {
			// 	element.removeEventListener('dragstart', eventListenerFunc);
			// }
		}, []);

		return (
			<Component
				{...rest}
				draggable={!disabled}
				disabled={disabled}
				ref={ref}
			/>
		);
	}

	return ForwardRef(DraggableHOC);
});
