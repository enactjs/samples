import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import {Panel, Header} from '@enact/sandstone/Panels';

const UseTransition = kind({
	name: 'UseTransition',

	render: (props) => (
		<Panel {...props}>
			<Header title="UseTransition" type="mini" />
			<Button>Click me</Button>
		</Panel>
	)
});

export default UseTransition;
