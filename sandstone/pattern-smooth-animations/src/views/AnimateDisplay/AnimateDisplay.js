import {useCallback, useState} from 'react';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {Cell, Layout, Row} from '@enact/ui/Layout';

import appCss from '../../App/App.module.less';
import componentCss from './AnimateDisplay.module.less';

const AnimateDisplay = ({...rest}) => {
	const [clicked, setClicked] = useState(false);

	const handleClicked = useCallback(() => {
		setClicked(!clicked);
	}, [clicked]);

	return (
		<Layout {...rest} align="center" orientation="vertical">
			<BodyText className={appCss.title}>
				Starting from Chrome 116, we have the ability to animate &apos;display&apos; and &apos;content-visibility&apos; properties on a keyframe timeline.
			</BodyText>
			<Row>
				<Cell className={clicked ? componentCss.disappear : ''} shrink>
					<div className={componentCss.card}>
						<BodyText>This example demonstrates animating the &apos;display&apos; property.</BodyText>
						<BodyText>When clicking the button below, the card will scale and then disappear.</BodyText>
						<Button onClick={handleClicked}>Click me</Button>
					</div>
				</Cell>
			</Row>
		</Layout>
	);
};

export default AnimateDisplay;
