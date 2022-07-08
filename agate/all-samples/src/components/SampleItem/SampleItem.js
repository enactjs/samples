import Item from '@enact/agate/Item';
import PropTypes from 'prop-types';
import {useCallback} from 'react';

const SampleItem = ({children, history, path, ...rest}) => {
	const itemSelect = useCallback(() => {
		history.push({pathname: path});
	}, [history, path]);

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
