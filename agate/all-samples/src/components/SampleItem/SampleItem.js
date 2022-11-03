import Item from '@enact/agate/Item';
import PropTypes from 'prop-types';
import {useCallback} from 'react';

const SampleItem = ({children, navigate, path, ...rest}) => {
	const itemSelect = useCallback(() => {
		navigate({pathname: path});
	}, [navigate, path]);

	return (
		<Item {...rest} onClick={itemSelect}>
			{children}
		</Item>
	);
};

SampleItem.propTypes = {
	navigate: PropTypes.func,
	path: PropTypes.any
};

export default SampleItem;
