import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import kind from '@enact/core/kind';
import {Panel} from '@enact/sandstone/Panels';
import {Cell, Row} from '@enact/ui/Layout';

import componentCss from './MainPanel.module.less';

const MainPanel = kind({
	name: 'MainPanel',

	styles:{
		className: 'MainPanel',
		css: componentCss
	},

	render: ({css, props}) => (
		<Panel {...props}>
			<BodyText>Before the changes</BodyText>
			<Row className={css.row}>
				<Cell css={css} component={Button}>Button as Cell component</Cell>
				<Cell>
					<Button css={css}>Button inside Cell</Button>
				</Cell>
			</Row>
			<BodyText>After the changes</BodyText>
			<Row className={css.row}>
				<Cell componentCss={css} component={Button}>Button as Cell component</Cell>
				<Cell>
					<Button css={css}>Button inside Cell</Button>
				</Cell>
			</Row>
		</Panel>
	)
});

export default MainPanel;
