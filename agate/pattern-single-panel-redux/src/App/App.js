import {Panels} from '@enact/agate/Panels';
import ThemeDecorator from '@enact/agate/ThemeDecorator';
import kind from '@enact/core/kind';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const App = kind({
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

export default ThemeDecorator(App);
