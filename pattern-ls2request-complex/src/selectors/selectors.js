import {createSelector} from 'reselect';

const getAppId = (state) =>  state.lunaService.appId || '';
const getCurrentCountryGroup = (state) =>  state.lunaService.shortName || '';
const getTvSystemName = (state) =>  state.lunaService.tvSystemName || '';
const getDeviceAuthenticationStatus = (state) =>  state.lunaService.isDeviceAuthenticated || '';

const getComplexValue = createSelector(
	[getAppId, getCurrentCountryGroup, getTvSystemName, getDeviceAuthenticationStatus],
	(appId, shortName, tvSystemName, isDeviceAuthenticated) => {
		// do complex logic to select value
		let retString = tvSystemName + ' ' + shortName;

		if (isDeviceAuthenticated) {
			retString = retString + ' is authenticated';
		}

		if (appId) {
			retString = retString + ' running ' + appId;
		}

		return retString;
	}
);

export {getComplexValue};
