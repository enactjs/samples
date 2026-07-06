import PropTypes from 'prop-types';
import {useCallback} from 'react';

import SpottableButton from '../SpottableButton';

import css from './SampleItem.module.less';

const SampleItem = ({children, navigate, path, ...rest}) => {
	const handleSelect = useCallback(() => {
		navigate(path);
	}, [navigate, path]);

	return (
		<SpottableButton {...rest} className={css.item} onClick={handleSelect}>
			{children}
		</SpottableButton>
	);
};

SampleItem.propTypes = {
	children: PropTypes.node,
	navigate: PropTypes.func,
	path: PropTypes.string
};

export default SampleItem;
