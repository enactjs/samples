import Button from '@enact/moonstone/Button';
import {connect} from 'react-redux';
import Divider from '@enact/moonstone/Divider';
import {Header} from '@enact/moonstone/Panels';
import IconButton from '@enact/moonstone/IconButton';
import kind from '@enact/core/kind';
import React, {PropTypes} from 'react';
import SelectableItem from '@enact/moonstone/SelectableItem';

import {addItem, deleteItem, selectAll, selectionEnable} from '../../actions';

class GalleryPanelHeader extends React.Component {
	
	static propTypes = {
		album: React.PropTypes.string,
		albumLength: React.PropTypes.number,
		addItem: React.PropTypes.func,
		deleteItem: React.PropTypes.func,
		selectAll: React.PropTypes.func,
		selectionEnable: React.PropTypes.func,
		showOverlay: PropTypes.bool.isRequired
	}

	addItem = () => {
		const item = this.createMockItem(this.props.album, this.props.albumLength);
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
			subText: subCaption,
			source: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + dataLength
		};
	}

	render = () => {
		const
			props = Object.assign({}, this.props),
			{addItem, showOverlay, deleteItem, selectAll} = this.props,
			deleteButton = showOverlay ? <Button small onClick={deleteItem}>Delete</Button> : null,
			selectAllButton = showOverlay ? <Button small onClick={selectAll}>Select All</Button> : null,
			showPreviousButton = showOverlay ? <IconButton tooltipPosition="above" tooltipText="Go To Previous" small onClick={this.showSelectionOverlayHandler}>rollbackward</IconButton> : null,
			selectionButton = !showOverlay ? <IconButton tooltipPosition="above" tooltipText="Selection" small onClick={this.showSelectionOverlayHandler}>check</IconButton> : null,
			addButton = !showOverlay ? <IconButton tooltipText="Add Item" small onClick={addItem}>plus</IconButton> : null;

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
	albumLength: datas.datasOrder.length,
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
