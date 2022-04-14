import 'web-animations-js';
import {createRoot} from 'react-dom';

import App from './main';

const container = document.getElementById('root');

const root = createRoot(container);

let appElement = <App />;

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	root.render(appElement);
}

export default appElement;
