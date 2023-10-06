import BodyText from '@enact/sandstone/BodyText';
import {Cell, Layout, Row} from '@enact/ui/Layout';

import appCss from '../../App/App.module.less';
// import componentCss from './StartingStyleRule.module.less';

const StartingStyleRule = ({...rest}) => {
	return (
		<Layout {...rest} orientation="vertical">
			<BodyText className={appCss.title}>
				Starting from Chrome 117, we can use the &apos;@starting-style&apos; rule to animate entry effects from &apos;display: none&apos; and into the top-layer.
			</BodyText>
			<Row>
				<Cell />
				<Cell />
			</Row>
		</Layout>
	);
}

export default StartingStyleRule;
