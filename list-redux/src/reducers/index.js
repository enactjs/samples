import {combineReducers, createStore} from "redux";

// NOTE: We use this type of structure for performance.
let mockData = {
	channelsOrder: [],
	channels: {},
	selectedChannels: new Set()
}

for (let index = 0; index < 100; index++) {
	mockData.channelsOrder.push(index)
	mockData.channels[index] = {
		id: index,
		favorite: false,
		source: "dtv",
		name: `Channel ${index}`,
		selected: false
	}
}

function channels (state = mockData, action) {
	switch (action.type) {
		case "SELECT_ITEM" : {
			state.channels[action.index].selected = !state.channels[action.index].selected;
			const isSelected = state.channels[action.index].selected;

			if (isSelected) {
				state.selectedChannels.add(action.index);
			} else {
				state.selectedChannels.delete(action.index);
			}

			return Object.assign({}, state);
		}
		case "SAVE_ITEMS": {
			state.selectedChannels.forEach((id) => {
				state.channels[id].favorite = true;
				state.channels[id].selected = false;
			})
			state.selectedChannels.clear()
			return Object.assign({}, state);
		}
		case "UNSAVE_ITEMS": {
			state.selectedChannels.forEach((id) => {
				state.channels[id].favorite = false;
				state.channels[id].selected = false;
			})
			state.selectedChannels.clear()
			return Object.assign({}, state);
		}
		default: {
			return state
		}
	}
}

const rootReducer = combineReducers({
	channels
});

const store = createStore(rootReducer);

export default store;