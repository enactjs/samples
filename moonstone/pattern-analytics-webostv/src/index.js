import {configure} from '@enact/analytics/preset/webostv';
import {createRoot} from 'react-dom';
import 'web-animations-js';

import analytics from '../analytics.cfg';

import App from './App';

// The webOS and webOS TV presets will log entries to PmLogLib.
configure({
	// Normally this defaults to `/mnt/lg/cmn_data/whitelist/dr/enact/${appId}.json`,
	// however for the purposes of this demo, using a local JSON-formatted file.
	path: analytics
});

/*
	For reference, the external JSON-formatted file includes the following setup:
	{
		// Enables the usage of analytics
		"enabled": true,
		// Option custom message ID for PmLogLib. Defaults to NL_ENACT
		"messageId": "MYCUSTOMID",
		"rules": [
			// the first matching rule will be used
			{
				// only match messages that include ZOOM in the label field
				"include": {
					"label": ["ZOOM"]
				},
				// Example custom data to include on click/enter-key events.
				"data": {
					// add messageId to the message with the value NL_ZOOM
					"messageId": "NL_ZOOM"
				}
			},
			{
				// This includes a `panel` property with the Panel header text.
				"data": {
					"panel": {
						// find the first Panel ancestor
						"closest": "article[role='region']",
						"value": {
							// from that Panel node, find the first h1 descendant
							"selector": "header h1",
							// and retrieve its textContent
							"value": "<text>"
						}
					}
				}
			}
		]
	}
*/

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	const container = document.getElementById('root');
	const root = createRoot(container);

	root.render(appElement);
}

export default appElement;
