import Button from '@enact/moonstone/Button';
import {connect} from 'react-redux';
import {Header} from '@enact/moonstone/Panels';
import IconButton from '@enact/moonstone/IconButton';
import React, {PropTypes} from 'react';

import {addItem, deleteItem, selectAll, selectionEnable} from '../../actions';

class GalleryPanelHeader extends React.Component {
	static propTypes = {
		album: PropTypes.string,
		albumSize: PropTypes.number,
		addItem: PropTypes.func,
		deleteItem: PropTypes.func,
		selectAll: PropTypes.func,
		selectionEnable: PropTypes.func,
		showOverlay: PropTypes.bool.isRequired
	}

	addMockItem = () => {
		const item = this.createMockItem(this.props.album, this.props.albumSize);
		this.props.addItem(item);
	}

	showSelectionOverlayHandler = () => {
		this.props.selectionEnable();
	}

	createMockItem = (album, size) => {
		const
			dataLength = size,
			caption = (dataLength % 8 === 0) ? ' with long title' : '',
			subCaption = (dataLength % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle',
			color = Math.floor((Math.random() * 0xEFEFF0) + 0x101010).toString(16);

		return {
			selected: false,
			selectionOverlayShowing: this.props.showOverlay,
			caption: album + ' ' + dataLength + caption,
			subCaption: subCaption,
			source: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + dataLength
		};
	}

	render = () => {
		const
			props = Object.assign({}, this.props),
			{showOverlay} = this.props,
			deleteButton = showOverlay ? <Button small onClick={this.props.deleteItem}>Delete</Button> : null,
			selectAllButton = showOverlay ? <Button small onClick={this.props.selectAll}>Select All</Button> : null,
			showPreviousButton = showOverlay ? <IconButton tooltipPosition="above" tooltipText="Go To Previous" small onClick={this.showSelectionOverlayHandler}>rollbackward</IconButton> : null,
			selectionButton = !showOverlay ? <IconButton tooltipPosition="above" tooltipText="Selection" small onClick={this.showSelectionOverlayHandler}>check</IconButton> : null,
			addButton = !showOverlay ? <IconButton tooltipText="Add Item" small onClick={this.addMockItem}>plus</IconButton> : null;

		delete props.album;
		delete props.albumSize;
		delete props.addItem;
		delete props.deleteItem;
		delete props.selectAll;
		delete props.selectionEnable;
		delete props.showOverlay;

		return (
			<Header {...props}>
				{deleteButton}
				{selectAllButton}
				{showPreviousButton}
				{addButton}
				{selectionButton}
			</Header>
		);
	}
};

const mapStateToProps = ({datas}) => ({
	album: datas.album,
	albumSize: datas.datasOrder.length,
	showOverlay: datas.showOverlay
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
