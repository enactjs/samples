import LS2Request from '@enact/webos/LS2Request';

const services = [
	{
		service: 'luna://com.webos.service.sdx',
		method: 'getDeviceAuthenticationStatus',
		parameters: {}
	},
	{
		service: 'luna://com.webos.service.tv.systemproperty',
		method: 'getCurrentCountryGroup',
		parameters: {}
	},
	{
		service: 'luna://com.webos.service.tv.systemproperty',
		method: 'getProperties',
		parameters: {
			'keys': ['tvSystemName']
		}
	},
	{
		service: 'luna://com.webos.applicationManager',
		method: 'getForegroundAppInfo',
		parameters: {}
	}
];

const handleLS2RequestSuccessBatch = payload => {
	return {
		type: 'LS2REQUEST_COMPLETE',
		payload
	};
};

const sendLS2Request = () => dispatch => {
	services.forEach(({service, method, parameters}) => {
		new LS2Request().send({
			service,
			method,
			parameters,
			onSuccess: (res) => dispatch(handleLS2RequestSuccessBatch(res)),
			onFailure: (res) => console.error(res)
		});
	});
};

export {sendLS2Request};
