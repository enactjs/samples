import {combineReducers} from 'redux';

import {ADD_ITEM, DELETE_ITEM, SELECTION_ENABLE, SELECT_ALL, SELECT_ITEM, CHANGE_ALBUM} from '../actions';

const createRecords = (album) => {
	let
		records = {
			album: album,
			dataOrder: [],
			data: {},
			selectedItems: new Set(),
			showOverlay: false
		},
		caption, subCaption, color;

	for (let idx = 0; idx < 500; ++idx) {
		caption = (idx % 8 === 0) ? ' with long title' : '';
		subCaption = (idx % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle';
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16);

		records.dataOrder.push(idx);
		records.data[idx] = {
			selected: false,
			selectionOverlayShowing: false,
			caption: album + ' ' + idx + caption,
			subCaption: subCaption,
			source: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + idx
		};
	}

	return records;
};

const initialState = createRecords('Family');

const data = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ITEM: {
			const addedKey = Object.keys(state.data).length;
			let
				newData = Object.assign({}, state.data),
				newDataOrder = state.dataOrder;

			newData[addedKey] = action.item;
			newDataOrder = state.dataOrder.concat(addedKey);

			return Object.assign({}, state, {data: newData, dataOrder: newDataOrder, selectedItems: new Set()});
		}
		case CHANGE_ALBUM: {
			if (state.album !== action.album) {
				return Object.assign({}, state, createRecords(action.album));
			} else {
				return state;
			}
		}
		case DELETE_ITEM: {
			const
				selectedItems	= new Set(state.selectedItems),
				filteredDataOrder = state.dataOrder.filter((item) => !selectedItems.has(item));

			let
				newData = {},
				newDataOrder = [];

			for (let i = 0; i < filteredDataOrder.length; i++) {
				const newId = filteredDataOrder[i];
				newData[i] = state.data[newId];
				newDataOrder.push(i);
			}

			return Object.assign({}, state, {data: newData, dataOrder: newDataOrder, selectedItems: new Set()});
		}
		case SELECTION_ENABLE: {
			let newdata = {};

			Object.keys(state.data).forEach((id) => {
				newdata[id] = Object.assign({}, state.data[id], {selectionOverlayShowing: !state.data[id].selectionOverlayShowing});
			});

			return Object.assign({}, state, {data: newdata, showOverlay: !state.showOverlay});
		}
		case SELECT_ALL: {
			const selectedItems = new Set(state.selectedItems);

			if (selectedItems.size === state.dataOrder.length) {
				selectedItems.clear();
			} else {
				for (let i = 0; i < state.dataOrder.length; i++) {
					selectedItems.add(i);
				}
			}

			return Object.assign({}, state, {selectedItems});
		}
		case SELECT_ITEM: {
			const
				selectedItems = new Set(state.selectedItems),
				isSelected = selectedItems.has(action.index);

			if (state.showOverlay) {
				if (isSelected) {
					selectedItems.delete(action.index);
				} else {
					selectedItems.add(action.index);
				}
			}

			return Object.assign({}, state, {selectedItems});
		}
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	data
});

export default rootReducer;
