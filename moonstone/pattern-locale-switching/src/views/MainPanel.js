import {Header, Panel} from '@enact/moonstone/Panels';
import kind from '@enact/core/kind';
import React from 'react';

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
