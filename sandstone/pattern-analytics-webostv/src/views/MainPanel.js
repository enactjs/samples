import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Analytics Example" />
			<BodyText>
				This app is hooked in to @enact/analytics with the webOS TV preset
				and outputs log entries via PmLogLib.
			</BodyText>
			<Button>Click me</Button>
			<Button aria-label="ZOOM" icon="zoomin" />
		</Panel>
	)
});

export default MainPanel;
