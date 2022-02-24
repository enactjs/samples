import { createAction, createReducer } from "@reduxjs/toolkit";
import {combineReducers} from 'redux';

export const addItem = createAction("ADD_ITEM");
export const changeAlbum = createAction("CHANGE_ALBUM");
export const deleteItem = createAction("DELETE_ITEM");
export const selectAll = createAction("SELECT_ALL");
export const selectionEnable = createAction("SELECTION_ENABLE");
export const selectItem = createAction("SELECT_ITEM");

const createRecords = (album) => {
	let
		records = {
			album: album,
			dataOrder: [],
			data: {},
			selectedItems: [],
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

const data = createReducer(initialState, {
	[addItem]: (state, action) => {
		const addedKey = Object.keys(state.data).length;
		let
			newData = Object.assign({}, state.data),
			newDataOrder = state.dataOrder;

		newData[addedKey] = action.payload;
		newDataOrder = state.dataOrder.concat(addedKey);

		state.data = newData;
		state.dataOrder = newDataOrder;
		state.selectedItems = [];
	},
	[changeAlbum]: (state, action) => {
		if (state.album !== action.payload) {
			return Object.assign({}, state, createRecords(action.payload));
		}
	},
	[deleteItem]: (state) => {
		const
				selectedItems	= state.selectedItems,
				filteredDataOrder = state.dataOrder.filter((item) => !selectedItems.includes(item));

		let
			newData = {},
			newDataOrder = [];

		for (let i = 0; i < filteredDataOrder.length; i++) {
			const newId = filteredDataOrder[i];
			newData[i] = state.data[newId];
			newDataOrder.push(i);
		}

		state.data = newData;
		state.dataOrder = newDataOrder;
		state.selectedItems = [];
	},
	[selectionEnable]: (state) => {
		let newdata = {};

		Object.keys(state.data).forEach((id) => {
			newdata[id] = Object.assign({}, state.data[id], {selectionOverlayShowing: !state.data[id].selectionOverlayShowing});
		});

		state.data = newdata;
		state.showOverlay = !state.showOverlay;
	},
	[selectAll]: (state) => {
		const selectedItems = state.selectedItems;

		if (selectedItems.length === state.dataOrder.length) {
			selectedItems.length = 0;
		} else {
			for (let i = 0; i < state.dataOrder.length; i++) {
				selectedItems.push(i);
			}
		}

		state.selectedItems = selectedItems;

	},
	[selectItem]: (state, action) => {
		const
			selectedItems = state.selectedItems,
			isSelected = selectedItems.includes(action.payload);

		if (state.showOverlay) {
			if (isSelected) {
				let id = selectedItems.indexOf(action.payload);
				if(id>=0) {
					selectedItems.splice(id, 1);
				}
			} else {
				selectedItems.push(action.payload);
			}
		}

		state.selectedItems = selectedItems;

	}
});

const rootReducer = combineReducers({
	data
});

export default rootReducer;
