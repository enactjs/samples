import {Panels} from '@enact/limestone/Panels';
import ThemeDecorator from '@enact/limestone/ThemeDecorator';

import MainPanel from '../views/MainPanel';

const App = (props) => {
	return (
		<Panels {...props}>
			<MainPanel />
		</Panels>
	);
};

export default ThemeDecorator(App);
