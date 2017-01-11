import LS2Request from '@enact/webos/LS2Request';

function receiveSystemSettings (res) {
	return {
		type: 'RECEIVE_SYSTEM_SETTINGS',
		payload: res
	};
}

// sets value upon success callback
function updateSystemSettings ({settings}) {
	return {
		type: 'UPDATE_SYSTEM_SETTINGS',
		payload: {
			settings
		}
	};
}

export const getSystemSettings = params => dispatch => {
	// possible to dispatch an action at the start of fetching
	// dispatch({type: 'FETCH_SYSETEM_SETTINGS'});
	return new LS2Request().send({
		service: 'luna://com.webos.settingsservice/',
		method: 'getSystemSettings',
		parameters: params,
		onSuccess: (res) => {
			// dispatches action on success callback with payload
			dispatch(receiveSystemSettings(res));
		},
		onFailure: (res) => console.error(res)	// eslint-disable-line no-console
	});
};

export const setSystemSettings = params => dispatch => {
	return new LS2Request().send({
		service: 'luna://com.webos.settingsservice/',
		method: 'setSystemSettings',
		parameters: params,
		onSuccess: () => {
			dispatch(updateSystemSettings(params));
		},
		onFailure: (res) => console.error(res)	// eslint-disable-line no-console
	});
};

export const setSystemSettingsSubscribed = params => {
	// NOTE: This does not dispatch and will not update the store directly. It's expected to be updated by the subscription.
	return new LS2Request().send({
		service: 'luna://com.webos.settingsservice/',
		method: 'setSystemSettings',
		parameters: params,
		onSuccess: () => {}, // we expect the value will be updated via subscribed callback and do nothing here
		onFailure: (res) => console.error(res)	// eslint-disable-line no-console
	});
};
