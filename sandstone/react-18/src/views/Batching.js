import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/sandstone/Panels';

const Batching = kind({
	name: 'Batching',

	render: (props) => (
		<Panel {...props}>
			<Header title="Batching" />
			<Button>Click me</Button>
		</Panel>
	)
});

export default Batching;
