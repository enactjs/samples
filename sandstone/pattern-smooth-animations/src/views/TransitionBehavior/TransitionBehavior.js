import BodyText from '@enact/sandstone/BodyText';
import {Layout, Row} from '@enact/ui/Layout';

import appCss from '../../App/App.module.less';
import componentCss from './TransitionBehavior.module.less';

const TransitionBehavior = ({css, ...rest}) => {
	return (
		<Layout {...rest} orientation="vertical">
			<BodyText className={appCss.title}>
				Starting from Chrome 117, we can enable transitions of discrete properties by using 'transition-behavior' property with the 'allow-discrete' keyword.
			</BodyText>
			<Row>
				<BodyText className={componentCss.discrete} css={css}>This text changes color at render in 3s and disappears after 4s</BodyText>
			</Row>
			<Row>
				<BodyText className={componentCss.nonDiscrete} css={css}>This text changes color at render in 3s and disappears after 4s</BodyText>
			</Row>
		</Layout>
	);
}

export default TransitionBehavior;
