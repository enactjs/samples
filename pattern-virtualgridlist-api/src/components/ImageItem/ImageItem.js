import {connect} from 'react-redux';
import {ImageItem as ImageItemComp} from '@enact/sandstone/ImageItem';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import {selectItem} from '../../actions';

const ImageItem = kind({
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

	render: ({caption, selected, selectImageItem, selectionOverlayShowing, source, subCaption, index, ...rest}) => {

		return (
			<ImageItemComp
				{...rest}
				caption={caption}
				onClick={selectImageItem}
				disabled={(index%2 === 0)}
				selected={selected}
				selectionOverlayShowing={selectionOverlayShowing}
				source={source}
				subCaption={subCaption}
				orientation='horizontal'
				//imageIconSource={source}
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
