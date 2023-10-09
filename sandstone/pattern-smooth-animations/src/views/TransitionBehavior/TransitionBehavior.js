import BodyText from '@enact/sandstone/BodyText';
import {Cell, Layout, Row} from '@enact/ui/Layout';

import appCss from '../../App/App.module.less';
import componentCss from './TransitionBehavior.module.less';

const TransitionBehavior = ({...rest}) => {
	return (
		<Layout {...rest} orientation="vertical">
			<BodyText className={appCss.title}>
				Starting from Chrome 117, we can enable transitions of discrete properties by using &apos;transition-behavior&apos; property with the &apos;allow-discrete&apos; keyword.
			</BodyText>
			<Row>
				<Cell size="30%">
					<BodyText>&apos;transition-behavior: allow-discrete;&apos;</BodyText>
				</Cell>
				<Cell>
					<BodyText className={componentCss.discrete}>This text changes background-color and position at render in 3s</BodyText>
				</Cell>
			</Row>
			<Row>
				<Cell size="30%">
					<BodyText>&apos;transition-behavior: normal;&apos;</BodyText>
				</Cell>
				<Cell>
					<BodyText className={componentCss.nonDiscrete}>This text changes background-color at render in 3s</BodyText>
				</Cell>
			</Row>
		</Layout>
	);
};

export default TransitionBehavior;
