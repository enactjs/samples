import kind from '@enact/core/kind';
import {Panels} from '@enact/limestone/Panels';
import ThemeDecorator from '@enact/limestone/ThemeDecorator';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const AppBase = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<Panels {...props}>
			<MainPanel />
		</Panels>
	)
});

const App = ThemeDecorator(AppBase);

export default App;
export {App, AppBase};
