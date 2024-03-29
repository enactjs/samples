import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback} from 'react';
import {connect} from 'react-redux';

import ImageItem from '../ImageItem';

const ImageList = ({imageitems, ...rest}) => {
	const renderItem = useCallback(({...props}) => (<ImageItem {...props} />), []);

	delete rest.dispatch;

	return (
		<VirtualGridList
			{...rest}
			dataSize={imageitems.length}
			itemRenderer={renderItem}
			itemSize={{minHeight: ri.scale(570), minWidth: ri.scale(688)}}
		/>
	);
};

ImageList.propTypes = {
	dispatch: PropTypes.func,
	imageitems: PropTypes.array
};

const mapStateToProps = ({data}) => ({
	imageitems: data.dataOrder
});

export default connect(mapStateToProps)(ImageList);
