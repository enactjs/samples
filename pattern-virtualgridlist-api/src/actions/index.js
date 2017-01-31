export const ADD_ITEM = 'ADD_ITEM';
export const CHANGE_ALBUM = 'CHANGE_ALBUM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SELECTION_ENABLE = 'SELECTION_ENABLE';
export const SELECT_ALL = 'SELECT_ALL';
export const SELECT_ITEM = 'SELECT_ITEM';

export const addItem = (item) => {
	return {
		type: ADD_ITEM,
		item
	};
};

export const changeAlbum = (album) => {
	return {
		type: CHANGE_ALBUM,
		album
	};
};

export const deleteItem = () => {
	return {
		type: DELETE_ITEM
	};
};

export const selectAll = () => {
	return {
		type: SELECT_ALL
	};
};

export const selectionEnable = () => {
	return {
		type: SELECTION_ENABLE
	};
};

export const selectItem = (index) => {
	return {
		type: SELECT_ITEM,
		index
	};
};
