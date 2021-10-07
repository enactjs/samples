import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';
import PropTypes from 'prop-types';

import css from '../common/styles.module.less';

const AutoPopup = kind({
	name: 'AutoPopup',

	propTypes:{
		auto:PropTypes.bool,
		openWarning:PropTypes.bool,
		setAuto:PropTypes.func,
		setColorsToAuto:PropTypes.func,
		setOpenWarning:PropTypes.func
	},

	handlers:{
		onClickOk:(event, {auto, setAuto, setColorsToAuto, setOpenWarning}) => {
			setAuto(!auto);
			setColorsToAuto();
			setOpenWarning(false);
		},
		onClickCancel:(event, {setOpenWarning}) => {
			setOpenWarning(false);
		}
	},

	render:({onClickCancel, onClickOk, openWarning, ...rest}) => {
		return (
			<Popup {...rest} className={css.customAlert} open={openWarning} skin="neutral">
				<BodyText centered size="small" skin="neutral">Do you want to switch from manual to auto?</BodyText>
				<Button onClick={onClickOk} size="small" skin="neutral">Yes</Button>
				<Button onClick={onClickCancel} size="small" skin="neutral">No</Button>
			</Popup>
		);
	}
});

export default AutoPopup;
