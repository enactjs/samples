import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/sandstone/Panels';
import {Cell, Column} from '@enact/ui/Layout';

import ProfilePhotoPicker from '../components/ProfilePhotoPicker';
import SaveButton from '../components/SaveButton';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header casing="preserve" subtitle="Choose your profile picture" title="Profile Photo" type="compact" />
			<Column align="center">
				<Cell>
					<ProfilePhotoPicker />
				</Cell>
				<Cell component={SaveButton} shrink />
			</Column>
		</Panel>
	)
});

export default MainPanel;
