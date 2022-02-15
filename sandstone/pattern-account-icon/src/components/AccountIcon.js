import Icon from '@enact/sandstone/Icon';
import PropTypes from 'prop-types';

const AccountIcon = ({bgColor, text}) => {
	const accountStyle = {
		backgroundColor: bgColor,
		borderRadius: '50%',
		margin:0,
		fontSize:'1rem',
		overflow:'visible',
		color:'#e6e6e6'
	};

	return (
		<Icon style={accountStyle} size="small">{text}</Icon>
	);
};

AccountIcon.propTypes = {
	bgColor: PropTypes.string,
	text: PropTypes.string
};

export default AccountIcon;
