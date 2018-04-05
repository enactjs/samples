const decreaseIndex = () => {
	return {
		type: 'DECREASE_INDEX'
	};
};

const increaseIndex = () => {
	return {
		type: 'INCREASE_INDEX'
	};
};

const saveLastScrollInfo = (index, info) => {
	return {
		type: 'SAVE_LAST_SCROLL_INFO',
		index,
		info
	};
};

export {
	decreaseIndex,
	increaseIndex,
	saveLastScrollInfo
};
