import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';

import componentCss from './PopupSmoothAnimation.module.less';

const PopupSmoothAnimation = kind({
    name: 'PopupSmoothAnimation',

    styles: {
        css: componentCss,
        className: 'smoothAnimation'
    },

    render: ({css, openSmoothAnimation, toggleSmoothAnimation, ...rest}) => {
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
                <Button className={componentCss.closeButton} icon="closex" onClick={toggleSmoothAnimation} size="small" />
            </Popup>
        );
    }
});

export default PopupSmoothAnimation;
