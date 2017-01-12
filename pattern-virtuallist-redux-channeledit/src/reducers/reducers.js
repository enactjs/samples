import {combineReducers} from 'redux';
// NOTE: We use this type of structure for performance.
let initialState = {
	channelsOrder: [],
	channels: {},
	selectedChannels: new Set()
};

function channels (state = initialState, action) {
	switch (action.type) {
		case 'RECEIVE_CHANNEL_LIST': {
			const channelList = action.payload.channelList.reduce((prev, curr) => {
				prev.channelsOrder.push(curr.channelId);
				prev.channels[curr.channelId] = curr;
				prev.channels[curr.channelId].selected = false;
				return prev;
			}, state);

			return Object.assign({}, channelList);
		}
		case 'SELECT_ITEM' : {
			state.channels[action.index].selected = !state.channels[action.index].selected;
			const isSelected = state.channels[action.index].selected;

			if (isSelected) {
				state.selectedChannels.add(action.index);
			} else {
				state.selectedChannels.delete(action.index);
			}

			return Object.assign({}, state);
		}
		case 'LOCK_ITEMS': {
			state.selectedChannels.forEach((id) => {
				state.channels[id].locked = true;
				state.channels[id].selected = false;
			});
			state.selectedChannels.clear();
			return Object.assign({}, state);
		}
		case 'UNLOCK_ITEMS': {
			state.selectedChannels.forEach((id) => {
				state.channels[id].locked = false;
				state.channels[id].selected = false;
			});
			state.selectedChannels.clear();
			return Object.assign({}, state);
		}
		default: {
			return state;
		}
	}
}

function path (state = '/first', action) {
	switch (action.type) {
		case 'NAVIGATE':
			return action.path;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	channels,
	path
});

export default rootReducer
;
