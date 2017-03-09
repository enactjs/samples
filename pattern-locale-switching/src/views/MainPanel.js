import React from 'react';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import LocaleSwitch from '../components/LocaleSwitch';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Locale Switch" />
			<LocaleSwitch />
		</Panel>
	)
});

export default MainPanel;
