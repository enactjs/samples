/* eslint-disable react/jsx-no-bind */

import Item from '@enact/sandstone/Item';
import PropTypes from 'prop-types';


const SampleItem = (props) => {
	const itemSelect = () => {
		props.history.push({pathname: props.path});
	};
	const {children, ...rest} = props;
	return (
		<Item {...rest} onClick={itemSelect}>
			{children}
		</Item>
	);
};

SampleItem.propTypes = {
	history: PropTypes.object,
	path: PropTypes.any
};

export default SampleItem;
