import LS2Request from '@enact/webos/LS2Request';
import mockChannelList from '../mock/ChannelData.json';

export const selectItem = (index) => {
	return {
		type: 'SELECT_ITEM',
		index
	};
};

const updateLockItems = () => {
	return {
		type: 'LOCK_ITEMS'
	};
};

const updateUnlockItems = () => {
	return {
		type: 'UNLOCK_ITEMS'
	};
};

const receiveChannelList = (res) => {
	return {
		type: 'RECEIVE_CHANNEL_LIST',
		payload: res
	};
};

const selectedChannelsToArray = (channelSet) => {
	const channelArray = [];
	channelSet.forEach((val) => {
		channelArray.push(val);
	});

	return channelArray;
};

export const lockItems = () => (dispatch, getState) => {
	const channelIds = getState().channels.selectedChannels;
	const channelArray = selectedChannelsToArray(channelIds);

	if (!window.PalmSystem) {
		return dispatch(updateLockItems());
	}

	return new LS2Request().send({
		service: 'luna://com.webos.service.tv.channel',
		method: 'setChannelBlock',
		parameters: {channelIds: channelArray},
		onSuccess: () => {
			dispatch(updateLockItems());
		},
		// eslint-disable-next-line
		onFailure: (res) => console.error(res)
	});
};

export const unlockItems = () => (dispatch, getState) => {
	const channelIds = getState().channels.selectedChannels;
	const channelArray = selectedChannelsToArray(channelIds);

	if (!window.PalmSystem) {
		return dispatch(updateUnlockItems());
	}

	return new LS2Request().send({
		service: 'luna://com.webos.service.tv.channel',
		method: 'releaseChannelBlock',
		parameters: {channelIds: channelArray},
		onSuccess: () => {
			dispatch(updateUnlockItems());
		},
		// eslint-disable-next-line
		onFailure: (res) => console.error(res)
	});
};

export const getChannelList = () => dispatch => {
	// Mock Data
	if (!window.PalmSystem) {
		return dispatch(receiveChannelList(mockChannelList));
	}
	return new LS2Request().send({
		service: 'luna://com.webos.service.iepg',
		method: 'getChannelList',
		parameters: {
			'channelGroup': 'All',
			'channelMode' : ['Tuner'],
			'dataType':0,
			'sort':0
		},
		onSuccess: (res) => {
			dispatch(receiveChannelList(res));
		},
		// eslint-disable-next-line
		onFailure: (res) => console.error(res)
	});
};

export const navigate = (path) => {
	return {
		type: 'NAVIGATE',
		path
	};
};
