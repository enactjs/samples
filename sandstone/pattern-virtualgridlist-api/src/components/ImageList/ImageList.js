/* eslint-disable react/jsx-no-bind */

import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ImageItem from '../ImageItem';

const ImageList = (props) => {
	const renderItem = ({...rest}) => (<ImageItem {...rest} />);
	const
		restCopy = Object.assign({}, props),
		{imageitems} = props;

	delete restCopy.dispatch;
	delete restCopy.imageitems;

	return (
		<VirtualGridList
			{...restCopy}
			dataSize={imageitems.length}
			itemRenderer={renderItem}
			itemSize={{minHeight: ri.scale(540), minWidth: ri.scale(360)}}
			spacing={ri.scale(42)}
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
