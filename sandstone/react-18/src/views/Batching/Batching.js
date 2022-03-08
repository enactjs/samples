import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import {Panel, Header} from '@enact/sandstone/Panels';
import {Cell, Row} from '@enact/ui/Layout';

import BatchedAssign from './BatchedAssign';
import NotBatchedAssign from './NotBatchedAssign';

const Batching = kind({
	name: 'Batching',

	render: (props) => (
		<Panel {...props}>
			<Header title="Batching" type="mini" />
			<Row>
				<Cell>
					<BodyText>
						Batching is when React groups multiple state updates into a single re-render for better performance.
					</BodyText>
					<BodyText>
						In this example we have a For Loop that will call a state updating function a 1000 times incrementing
						or decrementing the value by 1 each time.
					</BodyText>
				</Cell>
				<Cell>
					<BatchedAssign />
				</Cell>
				<Cell>
					<NotBatchedAssign />
				</Cell>
			</Row>
		</Panel>
	)
});

export default Batching;
