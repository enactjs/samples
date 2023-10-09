import BodyText from '@enact/sandstone/BodyText';
import {Layout, Row} from '@enact/ui/Layout';

import appCss from '../../App/App.module.less';
import componentCss from './StartingStyleRule.module.less';

const StartingStyleRule = ({...rest}) => {
	return (
		<Layout {...rest} orientation="vertical">
			<BodyText className={appCss.title}>
				Starting from Chrome 117, we can use the &apos;@starting-style&apos; rule to animate entry effects from &apos;display: none&apos; and into the top-layer.
			</BodyText>
			<Row align="center" className={componentCss.coloredDiv}>
				<BodyText>
					This div has a starting style rule that set &apos;background-color&apos; to &apos;deeppink&apos; and &apos;margin-left&apos; to &apos;-100%&apos;
					but transitions to its normal position and the default &apos;transparent&apos; &apos;background-color&apos;.
				</BodyText>
			</Row>
		</Layout>
	);
}

export default StartingStyleRule;
