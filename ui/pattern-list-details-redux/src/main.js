import {Provider} from 'react-redux';

import App from './App';
import configureAppStore from './store';

// set default launch path
const store = configureAppStore();

let appElement = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default appElement;
