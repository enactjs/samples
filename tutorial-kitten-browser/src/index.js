import React from 'react'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import 'web-animations-js';

import App from './App';

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	// 'root' div is provided by Enact's HTML template
	render(appElement, document.getElementById('root'));
}

export default appElement;
