import ImageItem from '@enact/agate/ImageItem';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectItem} from '../../actions';

const GalleryItem = kind({
	name: 'ImageItem',

	propTypes: {
		caption: PropTypes.string,
		index: PropTypes.number,
		selected: PropTypes.bool,
		selectImageItem: PropTypes.func,
		selectionOverlayShowing: PropTypes.bool,
		source: PropTypes.string,
	},

	render: ({caption, selected, selectImageItem, selectionOverlayShowing, source, ...rest}) => {
		delete rest.index;

		return (
			<ImageItem
				{...rest}
				onClick={selectImageItem}
				selected={selected}
				src={source}
				style={selectionOverlayShowing && selected ? {background: "#8b7efe"} : null}
			>
				{caption}
			</ImageItem>
		);
	}
});

const mapStateToProps = ({data}, {['data-index']: dataIndex}) => ({
	caption: data.data[dataIndex].caption,
	selected: data.selectedItems.has(dataIndex),
	selectionOverlayShowing: data.data[dataIndex].selectionOverlayShowing,
	source: data.data[dataIndex].source,
});

const mapDispatchToProps = (dispatch, {['data-index']: dataIndex}) => {
	return {
		selectImageItem: () => dispatch(selectItem(dataIndex))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItem);
