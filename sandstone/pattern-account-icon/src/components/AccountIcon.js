import Icon from '@enact/sandstone/Icon';
import PropTypes from 'prop-types';

import css from './AccountIcon.module.less';

const AccountIcon = ({bgColor, initialName}) => {
	const accountStyle = {
		backgroundColor: bgColor
	};

	return (
		<Icon css={css} style={accountStyle} size="small">{initialName}</Icon>
	);
};

AccountIcon.propTypes = {
	bgColor: PropTypes.string,
	initialName: PropTypes.string
};

export default AccountIcon;
