import {Provider} from 'react-redux';

import App, {AppBase} from './App';
import configureStore from './store';

// set default launch path
const store = configureStore();

const appElementBase = () => (
	<Provider store={store}>
		<AppBase />
	</Provider>
);

const appElement = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default appElement;
export {appElement, appElementBase};
