/* eslint-disable react/jsx-no-bind */

import Item from '@enact/ui/Item';
import PropTypes from 'prop-types';

const SampleItem = ({children, history, path, ...rest}) => {
	const itemSelect = () => {
		history.push({pathname: path});
	};

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
