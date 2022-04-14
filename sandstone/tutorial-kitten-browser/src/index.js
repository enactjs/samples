import {createRoot} from 'react-dom';
import 'web-animations-js';

import App from './App';

const container = document.getElementById('root');

const root = createRoot(container);

const appElement = (<App />);

// In a browser environment, render the app to the document.
if (typeof window !== 'undefined') {
	// 'root' div is provided by Enact's HTML template
	root.render(appElement);
}

export default appElement;
