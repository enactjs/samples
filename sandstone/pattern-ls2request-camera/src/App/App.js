import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import {Panels} from '@enact/sandstone/Panels';

import MainPanel from '../views/MainPanel';

const App = (props) => {
	return (
		<Panels {...props}>
			<MainPanel />
		</Panels>
	);
};

export default ThemeDecorator(App);
