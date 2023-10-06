import {useCallback, useState} from 'react';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import {Cell, Layout, Row} from '@enact/ui/Layout';

import PopupNoAnimation from '../../components/PopupNoAnimation';
import PopupSmoothAnimation from '../../components/PopupSmoothAnimation';

import appCss from '../../App/App.module.less';
// import componentCss from './AnimateDisplay.module.less';

const AnimateDisplay = ({...rest}) => {
	const [openNoAnimation, setOpenNoAnimation] = useState(false);
	const [openSmoothAnimation, setOpenSmoothAnimation] = useState(false);

	const toggleNoAnimation = useCallback(() => {
		setOpenNoAnimation(!openNoAnimation);
	}, [openNoAnimation]);

	const toggleSmoothAnimation = useCallback(() => {
		setOpenSmoothAnimation(!openSmoothAnimation);
	}, [openSmoothAnimation]);

	return (
		<Layout {...rest} orientation="vertical">
			<BodyText className={appCss.title}>
				Starting from Chrome 116, we have the ability to animate &apos;display&apos; and &apos;content-visibility&apos; properties on a keyframe timeline.
			</BodyText>
			<Row>
				<Cell>
					<BodyText>Click below to open a Popup that has no animation</BodyText>
					<Button
						onClick={toggleNoAnimation}
					>
						Open no animation
					</Button>
					<PopupNoAnimation
						openNoAnimation={openNoAnimation}
						toggleNoAnimation={toggleNoAnimation}
					/>
				</Cell>
				<Cell>
					<BodyText>Click below to open a Popup that has smooth animation</BodyText>
					<Button
						onClick={toggleSmoothAnimation}
					>
						Open smooth animation
					</Button>
					<PopupSmoothAnimation
						openSmoothAnimation={openSmoothAnimation}
						toggleSmoothAnimation={toggleSmoothAnimation}
					/>
				</Cell>
			</Row>
		</Layout>
	);
}

export default AnimateDisplay;
