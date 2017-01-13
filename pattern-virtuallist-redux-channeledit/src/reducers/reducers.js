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

				const completeCurrent = Object.assign({}, currentChannel, {selected: false});

				channelObj.channelsOrder = channelOrder;
				channelObj.channels[currentChannel.channelId] = completeCurrent;

				return channelObj;
			}, state);

			return Object.assign({}, state, newState);
		}
		case 'SELECT_ITEM' : {
			const isSelected = !state.channels[action.index].selected;
			const selectedChannels	= new Set(state.selectedChannels);

			if (isSelected) {
				selectedChannels.add(action.index);
			} else {
				selectedChannels.delete(action.index);
			}

			const newState = {
				channels: {
					[action.index] : {}
				}
			};
			newState.channels[action.index].selected = isSelected;

			const channelState = Object.assign({}, state.channels[action.index], newState.channels[action.index]);
			const channelsState = Object.assign({}, state.channels, {[action.index] : channelState});
			return Object.assign({}, state, {channels: channelsState, selectedChannels});
		}
		case 'LOCK_ITEMS': {
			const newChannelState = {};

			state.selectedChannels.forEach((id) => {
				newChannelState[id] = Object.assign({}, state.channels[id], {locked : true, selected: false});
			});

			const channelsState = Object.assign({}, state.channels, newChannelState);

			return Object.assign({}, state, {channels: channelsState, selectedChannels: new Set()});
		}
		case 'UNLOCK_ITEMS': {
			const newChannelState = {};

			state.selectedChannels.forEach((id) => {
				newChannelState[id] = Object.assign({}, state.channels[id], {locked : false, selected: false});
			});

			state.selectedChannels.clear();

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

export default rootReducer
;
