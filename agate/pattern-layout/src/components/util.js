//
// Utility Functions
//

import qs from 'query-string';

/*
 * Take an object, prune out the null/undefined values, and save that to the QUERY_STRING in the URL
 */
const saveObjToQueryString = (obj) => {
	const params = qs.parse(window.location.search);
	const allParams = Object.assign(params, obj); // Merge objects, preferring values in `obj`

	// Remove null and unassigned params
	Object.keys(allParams).forEach((p) => (allParams[p] == null) && delete allParams[p]);

	const stringified = qs.stringify(allParams);
	window.history.pushState(obj, '', (stringified ? `?${stringified}` : ''));
};

export {
	saveObjToQueryString
};
