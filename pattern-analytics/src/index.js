import {configure} from '@enact/analytics';
import React from 'react';
import {render} from 'react-dom';

import App from './App';

// All configure properties are optional and can be used
// to customize what is being detected, how the log entry
// is being formatted, and were to log the entries.
configure({
	enabled: true,
	selector: '.spottable',
	format: (node, {type}) => (node && {time: Date.now(), type, node}),
	log: console.log // eslint-disable-line
});

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
