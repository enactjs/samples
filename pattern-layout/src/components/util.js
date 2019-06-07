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

/*
 * Import a directory of images
 *
 * Originally from StackOverflow by klinore on Feb 8 '17 at 16:17
 * https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
 */
function importAll (r) {
	let images = {};
	r.keys().forEach((item) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

export {
	importAll,
	saveObjToQueryString
};
