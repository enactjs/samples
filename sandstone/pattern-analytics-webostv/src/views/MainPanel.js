import kind from '@enact/core/kind';
import BodyText from '@enact/moonstone/BodyText';
import Button from '@enact/moonstone/Button';
import IconButton from '@enact/moonstone/IconButton';
import {Header, Panel} from '@enact/moonstone/Panels';

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
			<IconButton aria-label="ZOOM">livezoom</IconButton>
		</Panel>
	)
});

export default MainPanel;
