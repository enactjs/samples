import {Provider} from 'react-redux';

import App, {AppBase} from './App';
import configureStore from './store';

// set default launch path
const launchParam = '/first/second';
const store = configureStore({
	path: launchParam
});

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
