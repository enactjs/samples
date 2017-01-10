const selectItem = (index) => {
	return {
		type: 'SELECT_ITEM',
		index: index
	}
}

const lockItems = () => {
	return {
		type: 'LOCK_ITEMS'
	}
}

const unlockItems = () => {
	return {
		type: 'UNLOCK_ITEMS'
	}
}

export const navigate = (path) => {
	return {
		type: 'NAVIGATE',
		path
	};
};

export {selectItem, lockItems, unlockItems}