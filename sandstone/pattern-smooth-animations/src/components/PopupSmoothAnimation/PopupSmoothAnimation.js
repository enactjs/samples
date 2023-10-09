import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';

import componentCss from './PopupSmoothAnimation.module.less';

const PopupSmoothAnimation = ({css, openSmoothAnimation, toggleSmoothAnimation, ...rest}) => {
	return (
		<Popup
			{...rest}
			className={componentCss.smoothAnimation}
			css={css}
			noAnimation
			open={openSmoothAnimation}
			position="right"
		>
			I have smooth animation
			<Button className={componentCss.closeButton} icon="closex" onClick={toggleSmoothAnimation} size="small"/>
		</Popup>
	);
};

export default PopupSmoothAnimation;
