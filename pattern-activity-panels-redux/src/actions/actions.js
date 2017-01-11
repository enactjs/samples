const increaseIndex = () => {
	return {
		type: 'INCREASE_INDEX'
	};
};

const decreaseIndex = () => {
	return {
		type: 'DECREASE_INDEX'
	};
};

export {
	increaseIndex,
	decreaseIndex
};
