import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import Panels from '@enact/moonstone/Panels';
import {configure} from '@enact/analytics';
import React from 'react';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

// All configure properties are optional and can be used
// to customize what is being detected, how the log entry
// is being formatted, and were to log the entries.
configure({
	enabled: true,
	selector: '.spottable',
	format: (node, {type}) => (node && {time: Date.now(), type, node}),
	log: console.log
});

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

export default MoonstoneDecorator(App);
