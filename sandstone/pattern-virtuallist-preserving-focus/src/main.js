import {Provider} from 'react-redux';

import App from './App';
import configureStore from './store';

// set default launch path
const store = configureStore();

const appElement = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default appElement;
