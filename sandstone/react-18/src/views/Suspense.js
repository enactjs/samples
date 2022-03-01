import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/sandstone/Panels';

const Suspense = kind({
	name: 'Suspense',

	render: (props) => (
		<Panel {...props}>
			<Header title="Suspense" />
			<Button>Click me</Button>
		</Panel>
	)
});

export default Suspense;
