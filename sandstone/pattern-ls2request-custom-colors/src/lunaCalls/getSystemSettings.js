import LS2Request from '@enact/webos/LS2Request';

export const getSystemSettings = (setContext) => {
	return new Promise((resolve) => {
		new LS2Request().send({
			service: 'luna://com.webos.service.settings/',
			method: 'getSystemSettings',
			parameters: {
				category: 'customUi',
				keys: ['theme']
			},
			onSuccess: (res) => {
				// if data is not initialized, don't update app context
				if (res.settings.theme === '') return;
				// update app context with values retrieved from SettingsService
				setContext(JSON.parse(res.settings.theme));
				// eslint-disable-next-line no-console
				console.log('setSystemSettings onSuccess');
				resolve(res);
			}
		})
	});
};
