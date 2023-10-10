import {useCallback, useState} from 'react';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Checkbox from '@enact/sandstone/Checkbox';
import Popup from '@enact/sandstone/Popup';
import {Cell, Layout, Row} from '@enact/ui/Layout';

import componentCss from './PopupSmoothAnimation.module.less';

const PopupSmoothAnimation = ({css, openSmoothAnimation, toggleSmoothAnimation, ...rest}) => {
	const [selected, setSelected] = useState(false);

	const toggleSelected = useCallback(() => {
		setSelected(!selected);
	}, [selected]);

	return (
		<Popup
			{...rest}
			className={componentCss.smoothAnimation}
			css={css}
			noAnimation
			open={openSmoothAnimation}
			position="right"
		>
			<BodyText className={componentCss.popupTitle}>I have smooth animation</BodyText>
			<Button className={componentCss.closeButton} icon="closex" onClick={toggleSmoothAnimation} size="small" />
			<Layout orientation="vertical">
				<Row>
					<Cell shrink>
						<Checkbox onToggle={toggleSelected} selected={selected} />
					</Cell>
					<Cell>
						<BodyText className={selected ? componentCss.checked : ''}>Check this box if you want a short poem to appear below.</BodyText>
						<span className={componentCss.poem}>
							Nature&apos;s first green is gold,
							<br />
							Her hardest hue to hold.
							<br />
							Her early leaf&apos;s a flower;
							<br />
							But only so an hour.
						</span>
					</Cell>
				</Row>
			</Layout>
		</Popup>
	);
};

export default PopupSmoothAnimation;
