const selectItem = (index) => {
	return {
		type: 'SELECT_ITEM',
		index: index
	}
}

const saveItems = () => {
	return {
		type: 'SAVE_ITEMS'
	}
}

const unsaveItems = () => {
	return {
		type: 'UNSAVE_ITEMS'
	}
}

export {selectItem, saveItems, unsaveItems}