import {connect} from 'react-redux';
import {GridListImageItem} from '@enact/moonstone/VirtualList';
import kind from '@enact/core/kind';
import React from 'react';

import {selectItem} from '../../actions/';

import css from './ImageItem.less';

const ImageItem = kind({
	name: 'ImageItem',

	propTypes: {
		caption: React.PropTypes.string,
		dataIndex: React.PropTypes.number,
		selected: React.PropTypes.bool,
		selectImageItem: React.PropTypes.func,
		source: React.PropTypes.string,
		subCaption: React.PropTypes.string
	},

	styles: {
		css,
		className: 'imageItem'
	},

	render: ({caption, selected, selectImageItem, selectionOverlayShowing, source, subCaption, ...rest}) => {
		delete rest.dataIndex;

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

const mapStateToProps = ({datas, ...rest}, {dataIndex}) => ({
	caption: datas.datas[dataIndex].caption,
	selected: datas.selectedItems.has(dataIndex),
	selectionOverlayShowing: datas.datas[dataIndex].selectionOverlayShowing,
	source: datas.datas[dataIndex].source,
	subCaption: datas.datas[dataIndex].subCaption
});


const mapDispatchToProps = (dispatch, {dataIndex}) => {
	return {
		selectImageItem: () => dispatch(selectItem(dataIndex))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageItem);
