import React from 'react';
import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';

import FileBrowser from '../components/FileBrowser';
import css from './App.less';

// This would be replaced by redux but Changeable is a handy single-value, single-event state HOC
const Browser = Changeable(
	{prop: 'path', change: 'onNavigate'},
	FileBrowser
);

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<div {...props}>
			<Browser defaultPath={{path: '/a', directory: true}} />
		</div>
	)
});

export default MoonstoneDecorator(App);
