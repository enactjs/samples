import BodyText from '@enact/sandstone/BodyText';
import {Cell, Layout, Row} from '@enact/ui/Layout';

import appCss from '../../App/App.module.less';
// import componentCss from './OverlayProperty.module.less';

const OverlayProperty = ({css, ...rest}) => {
	return (
		<Layout {...rest} orientation="vertical">
			<BodyText className={appCss.title}>
				Starting from Chrome 117, we have the ability to control top-layer behavior during an animation by using the 'overlay' property.
			</BodyText>
			<Row>
				<Cell></Cell>
				<Cell></Cell>
			</Row>
		</Layout>
	);
}

export default OverlayProperty;
