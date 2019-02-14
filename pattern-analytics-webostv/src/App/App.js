import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import Panels from '@enact/moonstone/Panels';
import {configure} from '@enact/analytics/preset/webostv';
import React from 'react';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

// The webOS and webOS TV presets will log entries to PmLogLib.
configure({
	enabled: true
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
