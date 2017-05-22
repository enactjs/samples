import React from 'react';
import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {Panels} from '@enact/moonstone/Panels';
import MainPanel from '../views/MainPanel';

const App = kind({
	name: 'App',

	render: (props) => (
		<div {...props}>
			<Panels>
				<MainPanel title="Expandable List" />
			</Panels>
		</div>
	)
});

export default MoonstoneDecorator(App);
