import kind from '@enact/core/kind';
import BodyText from '@enact/ui/BodyText';
import Button from '@enact/ui/Button';
import Heading from '@enact/ui/Heading';

import css from './MainPanel.module.less';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<div {...props} className={css.main}>
			<Heading size="title">Analytics Example</Heading>
			<BodyText>
				This app is hooked in to @enact/analytics with the webOS TV preset
				and outputs log entries via PmLogLib.
			</BodyText>
			<Button className={css.button}>Click me</Button>
			<Button aria-label="ZOOM" className={css.button}>livezoom</Button>
		</div>
	)
});

export default MainPanel;
