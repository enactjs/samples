import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';
import PropTypes from 'prop-types';

import componentCss from './PopupNoAnimation.module.less';

const PopupNoAnimation = ({css, openNoAnimation, toggleNoAnimation, ...rest}) => {
	return (
		<Popup
			{...rest}
			className={componentCss.noAnimation}
			css={css}
			noAnimation
			open={openNoAnimation}
			position="left"
		>
			<BodyText className={componentCss.popupTitle}>I have no animation</BodyText>
			<Button className={componentCss.closeButton} icon="closex" onClick={toggleNoAnimation} size="small" />
		</Popup>
	);
};

PopupNoAnimation.propTypes = {
	css: PropTypes.object,
	openNoAnimation: PropTypes.bool,
	toggleNoAnimation: PropTypes.func
};

export default PopupNoAnimation;
