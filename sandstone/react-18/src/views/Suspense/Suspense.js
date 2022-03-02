import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import {Panel, Header} from '@enact/sandstone/Panels';

const Suspense = kind({
	name: 'Suspense',

	render: (props) => (
		<Panel {...props}>
			<Header title="Suspense" type="mini" />
			<Button>Click me</Button>
		</Panel>
	)
});

export default Suspense;
