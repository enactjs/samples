import {Provider} from 'react-redux';

import App, {AppBase} from './App';
import configureAppStore from './store';

// set default launch path
// @ts-ignore
const store = configureAppStore();

let appElement = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default appElement;
export {appElement};
