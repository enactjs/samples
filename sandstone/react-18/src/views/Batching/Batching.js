import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import {Panel, Header} from '@enact/sandstone/Panels';

const Batching = kind({
	name: 'Batching',

	render: (props) => (
		<Panel {...props}>
			<Header title="Batching" type="mini" />
			<Button>Click me</Button>
		</Panel>
	)
});

export default Batching;
