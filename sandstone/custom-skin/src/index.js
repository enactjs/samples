import {createRoot} from 'react-dom';
import App from './App';

const appElement = (<App />);
const container = document.getElementById('root');
const root = createRoot(container);

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	root.render(appElement);
}

export default appElement;
