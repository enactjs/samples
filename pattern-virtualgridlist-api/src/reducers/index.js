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
			return [action.item, ...state];
		}
		case CHANGE_ALBUM : {
			return createRecords(action.album);
		}
		case DELETE_ITEM : {
			//const selectedItems	= new Set(state.selectedItems);
			let newDatas = {};
			let newDataOrder = [];
			let removeItem = [];


			
			/*var setIter = selectedItems.values();

			for (let i =0 ; i < selectedItems.size ; i++) {
				const remId = selectedItems.;
				delete newDatas[remId];
				newDataOrder = [...state.datasOrder.slice(0, remId), ...state.datasOrder.slice(remId + 1)];
				selectedItems.delete(i);
			}
*/
			//const newChannelState = {};
			state.selectedItems.forEach((id) => {

				removeItems.push(id);
				//newChannelState[id] = Object.assign({}, state.datas[id], {locked : true});
				//newDatas = Object.assign({}, state.datas);
				//delete newDatas[id];
				//console.log(id);
				//newDataOrder = [...state.datasOrder.slice(0, id), ...state.datasOrder.slice(id + 1)];
				//state.datasOrder.filter()

			});

			for (let i = 0; i < state.datasOrder; i++) {
				//if ()
			}

			console.log(newDataOrder.length);

			for (let i = 0; i <= newDataOrder.length; i++) {
				const newId = newDataOrder[i];
				newDatas[i] = state.datas[newId];
			}


			//selectedItems.clear();

			return Object.assign({}, state, {datas: newDatas, datasOrder: newDataOrder, selectedItems: new Set()});
		}
		case SELECTION_ENABLE : {
			let newdataState = {};

			Object.keys(state.datas).forEach((id) => {
				newdataState[id] = Object.assign({}, state.datas[id], {selectionOverlayShowing : !state.datas[id].selectionOverlayShowing});
			});
			
			const datasState = Object.assign({}, state.datas, newdataState);
			return Object.assign({}, state, {datas: datasState, showOverlay: !state.showOverlay});
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
			const selectedItems	= new Set(state.selectedItems);
			const isSelected = selectedItems.has(action.index);

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
