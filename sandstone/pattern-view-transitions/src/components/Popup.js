import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

import {addViewTransition} from './utils/utils';
import './utils/Animations.module.less';

const PopupWithTransition = ({selectedTransition}) => {
	const [isOpenPopup, setIsOpenPopup] = useState(false);

	const handleOnClick = useCallback(() => {
		setIsOpenPopup(prevState => !prevState);
	}, []);

	const onShow = useCallback(async () => {
		const element = document.getElementById('popup');
		await addViewTransition(0, selectedTransition, element);
	}, [selectedTransition]);

	return (
		<div>
			<Button onClick={handleOnClick}>Open popup</Button>
			<Popup
				id="popup"
				noAnimation
				onClose={handleOnClick}
				onShow={onShow}
				open={isOpenPopup}
			>
				<BodyText>Simple POPUP</BodyText>
			</Popup>
		</div>
	);
};

export default PopupWithTransition;

PopupWithTransition.propTypes = {
	selectedTransition: PropTypes.bool
};
