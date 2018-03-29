import {connect} from 'react-redux';
import GridListImageItem from '@enact/moonstone/GridListImageItem';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import {selectItem} from '../../actions';

const ImageItem = kind({
	name: 'ImageItem',

	propTypes: {
		a: PropTypes.number,
		b: PropTypes.number,
		c: PropTypes.number,
		caption: PropTypes.string,
		index: PropTypes.number,
		selected: PropTypes.bool,
		selectImageItem: PropTypes.func,
		selectionOverlayShowing: PropTypes.bool,
		source: PropTypes.string,
		subCaption: PropTypes.string
	},

	render: ({a, b, c, caption, selected, selectImageItem, selectionOverlayShowing, source, subCaption, ...rest}) => {
		delete rest.index;
		delete rest.a;
		delete rest.b;
		delete rest.c;

		console.log('ImageItem.render() coolCustomProps a, b, c:', a, b, c);

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
