import BodyText from '@enact/sandstone/BodyText';
import {Cell, Layout, Row} from '@enact/ui/Layout';

import appCss from '../../App/App.module.less';
// import componentCss from './StartingStyleRule.module.less';

const StartingStyleRule = ({css, ...rest}) => {
	return (
		<Layout {...rest} orientation="vertical">
			<BodyText className={appCss.title}>
				Starting from Chrome 117, we can use the '@starting-style' rule to animate entry effects from 'display: none' and into the top-layer.
			</BodyText>
			<Row>
				<Cell></Cell>
				<Cell></Cell>
			</Row>
		</Layout>
	);
}

export default StartingStyleRule;
