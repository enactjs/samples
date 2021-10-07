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
			<Popup skin="neutral" {...rest} styles={{width:'500px', height:'300px'}} open={openWarning}>
				<BodyText skin="neutral" >Do you want to switch from manual to auto?</BodyText>
				<Button skin="neutral" onClick={onClickOk}>Yes</Button>
				<Button skin="neutral" onClick={onClickCancel}>No</Button>
			</Popup>
		);
	}
});

export default AutoPopup;
