import kind from '@enact/core/kind';
import Button from '@enact/ui/Button';
import BodyText from '@enact/ui/BodyText';
import Heading from '@enact/ui/Heading';

import css from './MainPanel.module.less';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<div {...props} style={{position: 'absolute', inset: '0px 18px 24px', overflow: 'hidden'}}>
			<Heading size="title">Analytics Example</Heading>
			<BodyText>
				This app is hooked in to @enact/analytics and outputs log entries
				to the console as a demonstration.
			</BodyText>
			<Button className={css.button}>Click me</Button>
		</div>
	)
});

export default MainPanel;
