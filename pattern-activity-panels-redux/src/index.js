import 'web-animations-js';
import React from 'react'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';

import App from './main';

let appElement = <App />;

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	render(
		appElement,
		document.getElementById('root')
	);
}

export default appElement;
