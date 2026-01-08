import kind from '@enact/core/kind';
import ImageItem from '@enact/sandstone/ImageItem';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {selectItem} from '../../store';

const GalleryItem = kind({
	name: 'ImageItem',

	propTypes: {
		caption: PropTypes.string,
		index: PropTypes.number,
		selected: PropTypes.bool,
		selectImageItem: PropTypes.func,
		selectionOverlayShowing: PropTypes.bool,
		source: PropTypes.string,
		subCaption: PropTypes.string
	},

	render: ({caption, selected, selectImageItem, selectionOverlayShowing, source, subCaption, ...rest}) => {
		delete rest.index;

		return (
			<ImageItem
				{...rest}
				label={subCaption}
				onClick={selectImageItem}
				selected={selected}
				showSelection={selectionOverlayShowing}
				src={source}
				style={{padding: '18px'}}
			>
				{caption}
			</ImageItem>
		);
	}
});

const mapStateToProps = ({data}, {['data-index']: dataIndex}) => ({
	caption: data.data[dataIndex].caption,
	selected: data.selectedItems.includes(dataIndex),
	selectionOverlayShowing: data.data[dataIndex].selectionOverlayShowing,
	source: data.data[dataIndex].source,
	subCaption: data.data[dataIndex].subCaption
});

const mapDispatchToProps = (dispatch, {['data-index']: dataIndex}) => {
	return {
		selectImageItem: () => dispatch(selectItem(dataIndex))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItem);
