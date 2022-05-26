import kind from '@enact/core/kind';
import {Header, Panel} from '@enact/sandstone/Panels';

//Custom component
import Counter from '../components/Counter'

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Hello Enact + TypeScript!" />
			<Counter />
		</Panel>
	)
});

export default MainPanel;
