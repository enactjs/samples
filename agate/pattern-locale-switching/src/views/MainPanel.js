import Header from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';
import kind from '@enact/core/kind';

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
