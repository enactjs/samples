import {configureStore, combineReducers, createSlice} from '@reduxjs/toolkit';

const createRecords = (album) => {
	let records = {
		album: album,
		dataOrder: [],
		data: {},
		selectedItems: [],
		showOverlay: false
	};
	let caption, subCaption, color;

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
			source: 'http://via.placeholder.com/300x300/' + color + '/ffffff&text=Image ' + idx
		};
	}

	return records;
};

const recordSlice = createSlice({
	name: 'recordReducer',
	initialState: createRecords('Family'),
	reducers: {
		addItem: (state, action) => {
			const addedKey = Object.keys(state.data).length;
			let newData = Object.assign({}, state.data);
			let newDataOrder = state.dataOrder;

			newData[addedKey] = action.payload;
			newDataOrder = state.dataOrder.concat(addedKey);

			Object.assign(state, {data: newData, dataOrder: newDataOrder, selectedItems: []});
		},
		changeAlbum: (state, action) => {
			if (state.album !== action.payload) {
				Object.assign(state, createRecords(action.payload));
			}
		},
		deleteItem: (state) => {
			const selectedItems = state.selectedItems;
			const filteredDataOrder = state.dataOrder.filter((item) => !selectedItems.includes(item));

			let newData = {};
			let newDataOrder = [];

			for (let i = 0; i < filteredDataOrder.length; i++) {
				const newId = filteredDataOrder[i];
				newData[i] = state.data[newId];
				newDataOrder.push(i);
			}

			Object.assign(state, {data: newData, dataOrder: newDataOrder, selectedItems: []});
		},
		selectionEnable: (state) => {
			let newdata = {};

			Object.keys(state.data).forEach((id) => {
				newdata[id] = Object.assign({}, state.data[id], {selectionOverlayShowing: !state.data[id].selectionOverlayShowing});
			});

			Object.assign(state, {data: newdata, showOverlay: !state.showOverlay});
		},
		selectAll: (state) => {
			const selectedItems = state.selectedItems;

			if (selectedItems.length === state.dataOrder.length) {
				selectedItems.length = 0;
			} else {
				for (let i = 0; i < state.dataOrder.length; i++) {
					selectedItems.push(i);
				}
			}

			Object.assign(state, {selectedItems});
		},
		selectItem: (state, action) => {
			const selectedItems = state.selectedItems;
			const isSelected = selectedItems.includes(action.payload);

			if (state.showOverlay) {
				if (isSelected) {
					let id = selectedItems.indexOf(action.payload);
					if (id >= 0) {
						selectedItems.splice(id, 1);
					}
				} else {
					selectedItems.push(action.payload);
				}
			}

			Object.assign(state, {selectedItems});
		}
	}
});

export const {addItem, changeAlbum, deleteItem, selectionEnable, selectAll, selectItem} = recordSlice.actions;

const rootReducer = combineReducers({
	data : recordSlice.reducer
});

export default function configureAppStore (initialState) {
	const store = configureStore({
		reducer: rootReducer,
		initialState
	});

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./index.js', () => {
			store.replaceReducer(rootReducer);
		});
	}

	return store;
}
