import LS2Request from '@enact/webos/LS2Request';

// To use camera API in your web app, you need to set permissions for methods.
// First, you need to identify the ACG information for the camera methods.
// Then specify the method's ACG information in the appinfo.json file.
//
// appinfo.json
// {
//	 ...
//    "requiredPermissions": ["camera.query", "camera.operation"]
// }
// https://www.webosose.org/docs/guides/development/web-apps/using-ls2-api-in-web-apps/#identify-the-acg-group-of-the-methods

function getCameraList ({deviceList}) {
	return {
		type: 'GET_CAMERA_ID',
		payload: deviceList
	};
}

function updateCameraStatus (status) {
	return {
		type: 'UPDATE_CAMERA_STATUS',
		payload: status
	};
}

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
