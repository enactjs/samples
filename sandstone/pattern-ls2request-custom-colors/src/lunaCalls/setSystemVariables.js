import LS2Request from '@enact/webos/LS2Request';

export const setSystemVariables = (context) => {
	return new Promise((resolve) => {
		new LS2Request().send({
			service: 'luna://com.webos.service.settings/',
			method: 'setSystemSettings',
			parameters: {
				category: 'customUi',
				settings: {
					theme: JSON.stringify(context)
				}
			},
			onSuccess: (res) => {
				// eslint-disable-next-line no-console
				console.log('setSystemSettings onSuccess');
				resolve(res);
			}
		});
	});
};
