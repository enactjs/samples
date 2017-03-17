import {connect} from 'react-redux';
import {GridListImageItem} from '@enact/moonstone/VirtualList';
import kind from '@enact/core/kind';
import React from 'react';

import {selectItem} from '../../actions';

import css from './ImageItem.less';

const ImageItem = kind({
	name: 'ImageItem',

	propTypes: {
		caption: React.PropTypes.string,
		selected: React.PropTypes.bool,
		selectImageItem: React.PropTypes.func,
		selectionOverlayShowing: React.PropTypes.bool,
		source: React.PropTypes.string,
		subCaption: React.PropTypes.string
	},

	styles: {
		css,
		className: 'imageItem'
	},

	render: ({caption, selected, selectImageItem, selectionOverlayShowing, source, subCaption, ...rest}) => {
		delete rest.index;

		return (
			<GridListImageItem
				{...rest}
				caption={caption}
				onClick={selectImageItem}
				selected={selected}
				selectionOverlayShowing={selectionOverlayShowing}
				source={source}
				subCaption={subCaption}
			/>
		);
	}
});

const mapStateToProps = ({data}, {['data-index']: dataIndex}) => ({
	caption: data.data[dataIndex].caption,
	selected: data.selectedItems.has(dataIndex),
	selectionOverlayShowing: data.data[dataIndex].selectionOverlayShowing,
	source: data.data[dataIndex].source,
	subCaption: data.data[dataIndex].subCaption
});

const mapDispatchToProps = (dispatch, {['data-index']: dataIndex}) => {
	return {
		selectImageItem: () => dispatch(selectItem(dataIndex))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageItem);
