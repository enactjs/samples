import React from 'react';
import {render} from 'react-dom';

import App from './App';

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	// 'root' div is provided by Enact's HTML template
	render(appElement, document.getElementById('root'));
}

export default appElement;
