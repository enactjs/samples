import {configure} from '@enact/analytics';
import React from 'react';
import {render} from 'react-dom';

import App from './App';

// All configure properties are optional and can be used
// to customize what is being detected, how the log entry
// is being formatted, and were to log the entries.
configure({
	enabled: true,
	// A target selector for events
	selector: '.spottable',
	// Example of adding optional custom listeners
	// Could alternatively use a simple string array of events
	// when not needing any custom filters/adapters
	listeners: {
		keydown: {
			// Filter to only listen for space key
			filter: (ev) => ev.keyCode === 32,
			// Adapter to add additional properties to message payload.
			adapter: () => ({spaceKey:true})
		}
	},
	log: console.log // eslint-disable-line
});

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
