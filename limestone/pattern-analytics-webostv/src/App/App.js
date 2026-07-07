import kind from '@enact/core/kind';
import Panels from '@enact/limestone/Panels';
import ThemeDecorator from '@enact/limestone/ThemeDecorator';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<div {...props}>
			<Panels>
				<MainPanel />
			</Panels>
		</div>
	)
});

export default ThemeDecorator(App);
