import {Provider} from 'react-redux';

import App from './App';
import store from './store';

let appElement = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

export default appElement;
