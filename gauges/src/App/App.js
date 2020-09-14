import kind from '@enact/core/kind';
import ThemeDecorator from '@enact/agate/ThemeDecorator';
import Panels from '@enact/agate/Panels';
import React from 'react';

import MainPanel from '../views/MainPanel';

import css from './App.less';

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
