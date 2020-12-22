import React from 'react';
import {render} from 'react-dom';
import 'web-animations-js';

import App from './App';

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
