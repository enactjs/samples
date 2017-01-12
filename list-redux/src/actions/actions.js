import LS2Request from '@enact/webos/LS2Request';
import mockChannelList from '../mock/ChannelData.json';

export const selectItem = (index) => {
	return {
		type: 'SELECT_ITEM',
		index
	}
}

const updateLockItems = () =>{
	return {
		type: 'LOCK_ITEMS'
	}
}

const selectedChannelsToArray = (channelSet) => {
	let channelArray = [];
	channelSet.forEach((val) => {
		channelArray.push(val);
	})

	return channelArray;
}

export const lockItems = () => (dispatch, getState) => {
	const channelIds = getState().channels.selectedChannels;
	const channelArray = selectedChannelsToArray(channelIds)

	if(!window.webos){
		return dispatch(updateLockItems());
	}

	return new LS2Request().send({
		service: 'luna://com.webos.service.tv.channel',
		method: 'setChannelBlock',
		parameters: {channelIds: channelArray},
		onSuccess: (res) => {
			if(res.returnValue){
				dispatch(updateLockItems());
			}
		},
		onFailure: (res) => console.error(res)
	});
}

const updateUnlockItems = () => {
	return {
		type: 'UNLOCK_ITEMS'
	}
}

export const unlockItems = () => (dispatch, getState) => {
	const channelIds = getState().channels.selectedChannels;
	const channelArray = selectedChannelsToArray(channelIds);

	if(!window.webos){
		return dispatch(updateUnlockItems());
	}

	return new LS2Request().send({
		service: 'luna://com.webos.service.tv.channel',
		method: 'releaseChannelBlock',
		parameters: {channelIds: channelArray},
		onSuccess: (res) => {
			if(res.returnValue){
				dispatch(updateUnlockItems());
			}
		},
		onFailure: (res) => console.error(res)
	});
}


export const getChannelList = params => dispatch => {
	// Mock Data
	if(!window.webos){
		return dispatch(receiveChannelList(mockChannelList));
	}
	return new LS2Request().send({
		service: 'luna://com.webos.service.iepg',
		method: 'getChannelList',
		parameters: params,
		onSuccess: (res) => {
			dispatch(receiveChannelList(res));
		},
		onFailure: (res) => console.error(res)
	});
};

function receiveChannelList (res) {
	//Transform Data
	const channelList = res.channelList.reduce((prev, curr) => {
		prev.channelsOrder.push(curr.channelId)
		prev.channels[curr.channelId] = curr;
		prev.channels[curr.channelId].selected = false;
		return prev;
	}, {
		channelsOrder: [],
		channels: {},
		selectedChannels: new Set()
	});

	return {
		type: 'RECEIVE_CHANNEL_LIST',
		payload: channelList
	};
}

export const navigate = (path) => {
	return {
		type: 'NAVIGATE',
		path
	};
};