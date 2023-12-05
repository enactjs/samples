import hoc from '@enact/core/hoc';
import {useCallback, useRef, useState} from 'react';

import css from './Droppable.module.less';

const defaultConfig = {
	setterFunction: (value) => value,
	removerFunction: (value) => value
};

const getPositionAtCenter = (element) => {
	const {top, left, width, height} = element.getBoundingClientRect();
	return [
		left + width / 2,
		top + height / 2
	];
};

const getDistance = (clientX1, clientX2, clientY1, clientY2) => {
	return Math.sqrt(Math.pow((clientX1 - clientX2), 2) + Math.pow((clientY1 - clientY2), 2));
};

const Droppable = hoc(defaultConfig, (config, Wrapped) => {
	let App = Wrapped;

	const internalConfig = Object.assign({}, defaultConfig, config);

	const DroppableHOC = (rest) => {
		const [className, setClassName] = useState(css.normalContainer);
		const hoveredElement = useRef(null);

		const onDragLeave = useCallback((event) => {
			event?.preventDefault();
			setClassName(css.normalContainer);
		}, []);

		const onDragOver = useCallback((event) => {
			event?.preventDefault();

			if (event.target.role !== 'list') {
				hoveredElement.current = event.target.closest('.droppable-item');
			} else {
				const childrenList = Array.from(event.target.children);
				hoveredElement.current = childrenList[0];
				childrenList?.forEach((node) => {
					const [clientX, clientY] = getPositionAtCenter(node);
					const [refClientX, refClientY] = getPositionAtCenter(hoveredElement.current);

					if (getDistance(clientX, event.clientX, clientY, event.clientY) < getDistance(clientX, refClientX, clientY, refClientY)) {
						hoveredElement.current = node;
					}
				});
			}

			if (className === css.overContainer) return;
			setClassName(css.overContainer);
		}, [className]);

		const onDrop = useCallback((event) => {
			event?.preventDefault();

			const source = event.dataTransfer.getData('source');
			const transferElement = document.getElementById(source);
			internalConfig.setterFunction(elements => {
				const transferIndex = elements.findIndex(element => element === transferElement.textContent);
				if (transferIndex !== -1) {
					const temporary = [...elements];

					temporary.splice(transferIndex, 1);
					temporary.splice(elements.findIndex(element => element === hoveredElement.current.textContent), 0, transferElement.textContent);

					return temporary;
				}
				if (hoveredElement.current === null) {
					return [...elements, transferElement.textContent];
				}
				elements.splice(elements.findIndex(element => element === hoveredElement.current.textContent), 0, transferElement.textContent);
				return elements;
			});

			// intent for the usage of setterFunction
			// internalConfig.setterFunction(hoveredElement.current.textContent, transferElement.textContent);

			// This function will be used if we need to remove an item from the list
			// intent for the usage of removerFunction
			// internalConfig.removerFunction(transferElement.textContent);

			setClassName(css.normalContainer);
		}, []);

		delete config.removerFunction;
		delete config.setterFunction;

		return (
			<App
				droppable="true"
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
				className={className}
				{...config}
				{...rest}
			/>
		);
	};

	return DroppableHOC;
});

export default Droppable;
export {Droppable};
