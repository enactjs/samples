import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import BodyText from '@enact/sandstone/BodyText';
import Button from '@enact/sandstone/Button';
import Popup from '@enact/sandstone/Popup';

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
			setOpenWarning(false);
			setColorsToAuto();
		},
		onClickCancel:(event, {setOpenWarning}) => {
			setOpenWarning(false);
		}
	},

	render:({onClickCancel, onClickOk, openWarning, ...rest}) => {
		return (
			<Popup {...rest} styles={{width:'500px', height:'300px'}} open={openWarning}>
				<BodyText>Do you want to switch from manual to auto?</BodyText>
				<Button onClick={onClickOk}>Yes</Button>
				<Button onClick={onClickCancel}>No</Button>
			</Popup>
		);
	}
});

export default AutoPopup;
