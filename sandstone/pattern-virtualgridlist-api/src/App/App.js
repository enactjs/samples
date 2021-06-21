import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainView from '../views/MainView';

import css from './App.module.less';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<div {...props}>
			<MainView />
		</div>
	)
});

export default ThemeDecorator({noAutoFocus: true}, App);
