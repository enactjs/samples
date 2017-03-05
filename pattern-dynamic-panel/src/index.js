import React from 'react';
import {render} from 'react-dom';
import App from './App';

let appElement = (<App />);

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	render(
		appElement,
		document.getElementById('root')
	);
	appElement = null;
}

export default appElement;