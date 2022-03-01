import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/sandstone/Panels';

const UseTransition = kind({
	name: 'UseTransition',

	render: (props) => (
		<Panel {...props}>
			<Header title="UseTransition" />
			<Button>Click me</Button>
		</Panel>
	)
});

export default UseTransition;
