import Button from '@enact/moonstone/Button';
import {connect} from 'react-redux';
import {GridListImageItem, VirtualGridList} from '@enact/moonstone/VirtualList';
import {Header} from '@enact/moonstone/Panels';
import IconButton from '@enact/moonstone/IconButton';
import kind from '@enact/core/kind';
import React from 'react';
import ri from '@enact/ui/resolution';

import {addItem, changeAlbum, deleteItem, selectAll, selectionEnable, toggleItem} from '../actions';
import SideBar from '../components/SideBar';

import css from './MainView.less';

const albums = ['Family', 'Video', 'Travel'];

class MainView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			album: albums[0]
		};
		this.showOverlay = false;
	}

	addItem = () => {
		const item = this.createMockItem(this.state.album);
		this.props.addItem(item);
	}
	
	showSelectionOverlayHandler = () => {
		this.showOverlay = !this.showOverlay;
		this.props.selectionEnable();
	}

	onChange = (ev) => {
		const album = ev.value;
		this.setState({album: album});
		this.props.onChnageAlbum(album);
		this.scrollTo({index: 0, animate: false});
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}
	
	createMockItem = (album) => {
		const 
			dataLength = this.props.data.length,
			title = (dataLength % 8 === 0) ? ' with long title' : '',
			subTitle = (dataLength % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle',
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16);

		return {
			selected: false,
			text: album + ' ' + dataLength + title,
			subText: subTitle,
			url: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + dataLength,
			bgColor: '#' + color,
			selectionEnable: this.showOverlay
		}
	}

	renderItem = ({index, key}) => {
		return (
			<GridListImageItem
				key={key}
				caption={this.props.data[index].text}
				source={this.props.data[index].url}
				subCaption={this.props.data[index].subText}
				selected={this.props.data[index].selected}
				selectionOverlayShowing={this.props.data[index].selectionEnable}
				onClick={() => this.props.toggleItem(index)}
				className={css.gridListItem}
			/>
		);
	}

	render = () => {
		const
			deleteButton = this.showOverlay ? <Button onClick={this.props.deleteItem}>Delete</Button> : null,
			seleteAllButton = this.showOverlay ? <Button onClick={this.props.selectAll}>Select All </Button> : null,
			showPreviousButton = this.showOverlay ? <IconButton tooltipPosition="above" tooltipText="Go To Previous" onClick={this.showSelectionOverlayHandler}>rollbackward</IconButton> : null,
			selectionButton = !this.showOverlay ? <IconButton tooltipPosition="above" tooltipText="Selection" onClick={this.showSelectionOverlayHandler}>star</IconButton> : null,
			addButton = !this.showOverlay ? <IconButton tooltipText="Add Item" onClick={this.addItem}>plus</IconButton> : null;
			
		return (
			<div>
				<Header title="My Gallery">
					{addButton}
					{selectionButton}
					{deleteButton}
					{seleteAllButton}
					{showPreviousButton}
				</Header>
				<div className={css.body}>
					<SideBar
						albums={albums}
						onAlbumChange={this.onChange}
						selectedAlbum={this.state.album}
					/>
					<VirtualGridList
						cbScrollTo={this.getScrollTo}
						data={this.props.data}
						dataSize={this.props.data.length}
						itemSize={{minWidth: ri.scale(180), minHeight: ri.scale(270)}}
						spacing={ri.scale(20)}
						className={css.content}
						component={this.renderItem}
					/>
				</div>	
			</div>
		);
	}
}

let mapStateToProps = (state) => {
    return {
        data: state.data
    };
}

let mapDispatchToProps = (dispatch) => {
	return {
		addItem: (item) => dispatch(addItem(item)),
		deleteItem: () => dispatch(deleteItem()),
		onChnageAlbum: (album) => dispatch(changeAlbum(album)),
		selectionEnable: () => dispatch(selectionEnable()),
		selectAll: () => dispatch(selectAll()),
		toggleItem: (id) => dispatch(toggleItem(id))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
