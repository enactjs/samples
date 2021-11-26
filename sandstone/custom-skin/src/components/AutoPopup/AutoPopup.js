import kind from '@enact/core/kind';
import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';
import PropTypes from 'prop-types';

import css from '../../common/styles.module.less';

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
		delete rest.auto;
		delete rest.setAuto;
		delete rest.setColorsToAuto;
		delete rest.setOpenWarning;

		return (
			<Popup {...rest} className={css.customAlert} open={openWarning}>
				<BodyText centered size="small">Do you want to switch from manual to auto?</BodyText>
				<Button onClick={onClickOk} size="small">Yes</Button>
				<Button onClick={onClickCancel} size="small">No</Button>
			</Popup>
		);
	}
});

export default AutoPopup;
