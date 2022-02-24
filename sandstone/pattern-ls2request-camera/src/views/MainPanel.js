import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/sandstone/Panels';

import CameraView from '../components/CameraView';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header subtitle="Select a camera to start preview" title="Camera Sample" type="compact" />
			<CameraView />
		</Panel>
	)
});

export default MainPanel;
