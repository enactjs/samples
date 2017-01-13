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
			const newState = action.payload.channelList.reduce((previous, current) => {
				const channelObj = previous;

				const channelOrder = channelObj.channelsOrder.concat(current.channelId);

				const currentChannel = current;
				currentChannel.selected = false;

				channelObj.channelsOrder = channelOrder;
				channelObj.channels[current.channelId] = currentChannel;

				return channelObj;
			}, state);

			return Object.assign({}, newState);
		}
		case 'SELECT_ITEM' : {
			const newState = state;
			const isSelected = !newState.channels[action.index].selected;

			if (isSelected) {
				newState.selectedChannels.add(action.index);
			} else {
				newState.selectedChannels.delete(action.index);
			}

			newState.channels[action.index].selected = isSelected;

			return Object.assign({}, newState);
		}
		case 'LOCK_ITEMS': {
			const newState = state;

			newState.selectedChannels.forEach((id) => {
				newState.channels[id].locked = true;
				newState.channels[id].selected = false;
			});

			newState.selectedChannels.clear();
			return Object.assign({}, newState);
		}
		case 'UNLOCK_ITEMS': {
			const newState = state;

			newState.selectedChannels.forEach((id) => {
				newState.channels[id].locked = false;
				newState.channels[id].selected = false;
			});

			newState.selectedChannels.clear();
			return Object.assign({}, newState);
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
