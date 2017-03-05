import React from 'react';
import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';

import FileBrowser from '../components/FileBrowser';
import css from './App.less';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => (
		<div {...props}>
			<FileBrowser path="/a/b/c" />
		</div>
	)
});

export default MoonstoneDecorator(App);
