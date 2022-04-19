import {VirtualGridList} from '@enact/agate/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import ImageItem from '../ImageItem';

const ImageList = ({...rest}) => {
	const renderItem = useCallback(({...props}) => (<ImageItem {...props} />), []);
	const imageitems = useSelector(({data}) => data.dataOrder);

	delete rest.dispatch;

	return (
		<VirtualGridList
			{...rest}
			dataSize={imageitems.length}
			itemRenderer={renderItem}
			itemSize={{minHeight: ri.scale(270), minWidth: ri.scale(180)}}
			spacing={ri.scale(21)}
		/>
	);
};

ImageList.propTypes = {
	dispatch: PropTypes.func
};

export default ImageList;
