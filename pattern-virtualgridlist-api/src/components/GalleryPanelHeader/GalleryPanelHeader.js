import Button from '@enact/moonstone/Button';
import {connect} from 'react-redux';
import {Header} from '@enact/moonstone/Panels';
import IconButton from '@enact/moonstone/IconButton';
import kind from '@enact/core/kind';
import React, {PropTypes} from 'react';

import {addItem, deleteItem, selectAll, selectionEnable} from '../../actions';

const createMockItem = (album, albumSize, showOverlay) => {
	const
		dataLength = albumSize,
		caption = (dataLength % 8 === 0) ? ' with long title' : '',
		subCaption = (dataLength % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle',
		color = Math.floor((Math.random() * 0xEFEFF0) + 0x101010).toString(16);

	return {
		selected: false,
		selectionOverlayShowing: showOverlay,
		caption: album + ' ' + dataLength + caption,
		subCaption: subCaption,
		source: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + dataLength
	};
};

const GalleryPanelHeader = kind({
	name: 'GalleryPanelHeader',

	propTypes: {
		showOverlay: PropTypes.bool.isRequired,
		addItem: PropTypes.func,
		album: PropTypes.string,
		albumSize: PropTypes.number,
		deleteItem: PropTypes.func,
		selectAll: PropTypes.func,
		selectionEnable: PropTypes.func
	},

	handlers: {
		addMockItem: (ev, {addItem, album, albumSize, showOverlay}) => {
			addItem(createMockItem(album, albumSize, showOverlay));
		},
		deleteItem: (ev, {deleteItem}) => {
			deleteItem();
		},
		selectAll: (ev, {selectAll}) => {
			selectAll();
		},
		showSelectionOverlayHandler: (ev, {selectionEnable}) => {
			selectionEnable();
		}
	},

	render: ({addMockItem, deleteItem, selectAll, showOverlay, showSelectionOverlayHandler, ...rest}) => {
		delete rest.album;
		delete rest.albumSize;
		delete rest.addItem;
		delete rest.deleteItem;
		delete rest.selectAll;
		delete rest.selectionEnable;
		delete rest.showOverlay;

		return (
			<Header {...rest}>
				{!showOverlay && <IconButton tooltipText="Add Item" small onClick={addMockItem}>plus</IconButton>}
				{showOverlay && <Button small onClick={deleteItem}>Delete</Button>}
				{showOverlay && <Button small onClick={selectAll}>Select All</Button>}
				{!showOverlay && <IconButton tooltipPosition="above" tooltipText="Selection" small onClick={showSelectionOverlayHandler}>check</IconButton>}
				{showOverlay && <IconButton tooltipPosition="above" tooltipText="Go To Previous" small onClick={showSelectionOverlayHandler}>rollbackward</IconButton>}
			</Header>
		);
	}
});

const mapStateToProps = ({data}) => ({
	album: data.album,
	albumSize: data.dataOrder.length,
	showOverlay: data.showOverlay
});

const mapDispatchToProps = (dispatch) => {
	return {
		addItem: (item) => dispatch(addItem(item)),
		deleteItem: () => dispatch(deleteItem()),
		selectionEnable: () => dispatch(selectionEnable()),
		selectAll: () => dispatch(selectAll())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPanelHeader);
