import {combineReducers} from 'redux';

import {ADD_ITEM, DELETE_ITEM, SELECTION_ENABLE, SELECT_ALL, SELECT_ITEM, CHANGE_ALBUM} from '../actions';

const createRecords = (album) => {
	let
		records = {},
		caption, subCaption, color;

	records.album = album;
	records.datasOrder = [];
	records.datas = {};
	records.showOverlay = false;
	records.selectedItems = new Set();

	for (let idx = 0; idx < 500; ++idx) {
		caption = (idx % 8 === 0) ? ' with long title' : '';
		subCaption = (idx % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle';
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16);

		records.datasOrder.push(idx);
		records.datas[idx] = {
			selected: false,
			selectionOverlayShowing: false,
			caption: album + ' ' + idx + caption,
			subCaption: subCaption,
			source: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + idx
		}
	}

	return records;
};

const initialState = createRecords('Family');

const datas = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ITEM : {
			const addedKey = Object.keys(state.datas).length;
			let
				newDatas = Object.assign({}, state.datas),
				newDatasOrder = state.datasOrder;

			newDatas[addedKey] = action.item;
			newDatasOrder = state.datasOrder.concat(addedKey);

			return Object.assign({}, state, {datas: newDatas, datasOrder: newDatasOrder, selectedItems: new Set()});
		}
		case CHANGE_ALBUM : {
			if (state.album !== action.album) {
				return Object.assign({}, state, createRecords(action.album));
			} else {
				return state;
			}
		}
		case DELETE_ITEM : {
			const
				selectedItems	= new Set(state.selectedItems),
				filteredDatasOrder = state.datasOrder.filter((item) => !selectedItems.has(item));

			let
				newDatas = {},
				newDatasOrder =[];

			for (let i = 0; i < filteredDatasOrder.length; i++ ) {
				const newId = filteredDatasOrder[i];
				newDatas[i] = state.datas[newId];
				newDatasOrder.push(i);
			}

			return Object.assign({}, state, {datas: newDatas, datasOrder: newDatasOrder, selectedItems: new Set()});
		}
		case SELECTION_ENABLE : {
			let newdatas = {};

			Object.keys(state.datas).forEach((id) => {
				newdatas[id] = Object.assign({}, state.datas[id], {selectionOverlayShowing: !state.datas[id].selectionOverlayShowing});
			});

			return Object.assign({}, state, {datas: newdatas, showOverlay: !state.showOverlay});
		}
		case SELECT_ALL : {
			const selectedItems = new Set(state.selectedItems);

			if (selectedItems.size === state.datasOrder.length) {
				selectedItems.clear();
			} else {
				for (let i=0 ; i < state.datasOrder.length ; i++) {
					selectedItems.add(i);
				}
			}

			return Object.assign({}, state, {selectedItems});
		}
		case SELECT_ITEM : {
			const
				selectedItems	= new Set(state.selectedItems),
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
	datas
});

export default rootReducer;
