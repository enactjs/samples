import LS2Request from '@enact/webos/LS2Request';
import {configureStore, createSlice} from '@reduxjs/toolkit';

const rootSlice = createSlice({
	name: 'systemReducer',
	initialState: {
		cameraIds: [],
		cameraStatus: {}
	},
	reducers: {
		getCameraList: (state, action) =>  {
			return Object.assign({}, state, {cameraIds: action.payload.deviceList});
		},
		updateCameraStatus: (state, action) => {
			return Object.assign({}, state, {cameraStatus: action.payload.status});
		}
	}
});

export const {getCameraList, updateCameraStatus} = rootSlice.actions;

const open = (id) => {
	return new Promise((resolve) => {
		new LS2Request().send(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'open',
				parameters: {id},
				onSuccess: (res) => {
					resolve(res.handle);
				}
			}
		);
	});
};

const setFormat = (handle) => {
	return new Promise((resolve) => {
		new LS2Request().send(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'setFormat',
				parameters: {
					handle,
					params: {
						width: 1280,
						height: 720,
						format: 'JPEG',
						fps: 10
					}
				},
				onSuccess: () => {
					resolve(handle);
				}
			}
		);
	});
};

const startPreview = (handle) => {
	return new Promise((resolve) => {
		new LS2Request().send(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'startPreview',
				parameters: {
					handle,
					params: {
						type: 'sharedmemory',
						source: '0'
					}
				},
				onSuccess: (res) => {
					resolve({
						handle,
						memsrc: res.key + ''
					});
				}
			}
		);
	});
};

export const getCameraIds = () => dispatch => {
	return new LS2Request().send({
		service:'luna://com.webos.service.camera2/',
		method: 'getCameraList',
		parameters: {},
		onSuccess: (res) => {
			dispatch(getCameraList(res));
		}
		// onFailure: (res) => console.error(res)
	});
};

export const startCamera = (id) => dispatch => {
	return new Promise(() => {
		open(id)
			.then((handle) => {
				return setFormat(handle);
			})
			.then((handle) => {
				return startPreview(handle);
			})
			.then((res) => {
				// console.log('Camera Started', res);
				dispatch(updateCameraStatus({
					id: id,
					width: 1280,
					height: 720,
					frameRate: 10,
					format: 'JPEG',
					streamType: 'JPEG',
					memType: 'shmem',
					memSrc: res.memsrc,
					handle: res.handle
				}));
			});
	});
};

const stopPreview = (handle) => {
	return new Promise((resolve) => {
		new LS2Request().send(
			{
				service: 'luna://com.webos.service.camera2',
				method: 'stopPreview',
				parameters: {
					handle
				},
				onSuccess: () => {
					resolve();
				}
			}
		);
	});
};

export const closeCamera = (handle) => dispatch => {
	return new Promise(() => {
		stopPreview(handle)
			.then(() => {
				new LS2Request().send(
					{
						service: 'luna://com.webos.service.camera2',
						method: 'close',
						parameters: {
							handle
						},
						onSuccess: () => {
							// console.log('Camera Closed', res);
							dispatch(updateCameraStatus({}));
						}
					}
				);
			});
	});
};

const store = configureStore({
	reducer: rootSlice.reducer
});

export default store;
