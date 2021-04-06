import kind from '@enact/core/kind';
import Panels from '@enact/moonstone/Panels';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react'; // eslint-disable-line no-unused-vars

import MainView from '../views/MainView';

import css from './App.module.less';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<Panels {...props}>
			<MainView />
		</Panels>
	)
});

export default MoonstoneDecorator(App);
