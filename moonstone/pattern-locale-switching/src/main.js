import {Provider} from 'react-redux';

import App, {AppBase} from './App';
import store from './store';

let appElementBase = () => (
	<Provider store={store}>
		<AppBase />
	</Provider>
);

let appElement = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default appElement;
export {appElement, appElementBase};
