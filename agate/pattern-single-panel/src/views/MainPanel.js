import Header from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';
import kind from '@enact/core/kind';
import {Cell, Column} from '@enact/ui/Layout';

import ProfilePhotoPicker from '../components/ProfilePhotoPicker';
import SaveButton from '../components/SaveButton';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props} style={{paddingTop: '0px'}}>
			<Column>
				<Cell
					casing="preserve"
					component={Header}
					shrink
					subtitle="Choose your profile picture"
					title="Profile Photo"
					type="compact"
				/>
				<Cell align="center" shrink>
					<ProfilePhotoPicker />
				</Cell>
				<Cell align="center" component={SaveButton} shrink />
			</Column>
		</Panel>
	)
});

export default MainPanel;
