import {createRoot} from 'react-dom';
import 'web-animations-js';

import App from './App';

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	const container = document.getElementById('root');
	const root = createRoot(container);

	root.render(appElement);
}

export default appElement;
