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
				const channelObj = Object.assign({}, previous);
				const currentChannel = Object.assign({}, current);

				const channelOrder = channelObj.channelsOrder.concat(currentChannel.channelId);

				channelObj.channelsOrder = channelOrder;
				channelObj.channels[currentChannel.channelId] = currentChannel;

				return channelObj;
			}, state);

			return newState;
		}
		case 'SELECT_ITEM' : {
			const selectedChannels	= new Set(state.selectedChannels);
			const isSelected = selectedChannels.has(action.index);

			if (isSelected) {
				selectedChannels.delete(action.index);
			} else {
				selectedChannels.add(action.index);
			}

			return Object.assign({}, state, {selectedChannels});
		}
		case 'LOCK_ITEMS': {
			const newChannelState = {};

			state.selectedChannels.forEach((id) => {
				newChannelState[id] = Object.assign({}, state.channels[id], {locked : true});
			});

			const channelsState = Object.assign({}, state.channels, newChannelState);

			return Object.assign({}, state, {channels: channelsState, selectedChannels: new Set()});
		}
		case 'UNLOCK_ITEMS': {
			const newChannelState = {};

			state.selectedChannels.forEach((id) => {
				newChannelState[id] = Object.assign({}, state.channels[id], {locked : false});
			});

			const channelsState = Object.assign({}, state.channels, newChannelState);

			return Object.assign({}, state, {channels: channelsState, selectedChannels: new Set()});
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

export default rootReducer;
