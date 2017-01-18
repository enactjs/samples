import Button from '@enact/moonstone/Button';
import {GridListImageItem, VirtualGridList} from '@enact/moonstone/VirtualList';
import {Header} from '@enact/moonstone/Panels';
import IconButton from '@enact/moonstone/IconButton';
import React from 'react';
import ri from '@enact/ui/resolution';
import {Spotlight} from '@enact/spotlight';
import {startJob} from '@enact/core/jobs';

import SideBar from '../components/SideBar';

import AppStateDecorator from './AppStateDecorator';
import css from './MainView.less';

const
	albums = ['Family', 'Car', 'Travel'],
	doc = (typeof window === 'object') ? window.document : {};

class MainView extends React.Component {
	showOverlay = false
	currentAlbum = albums[0]

	addItem = () => {
		const item = this.createMockItem(this.currentAlbum);
		this.props.addItem(item);
	}

	showSelectionOverlayHandler = () => {
		this.showOverlay = !this.showOverlay;
		this.props.selectionEnable();
	}

	onChange = (ev) => {
		const album = ev.value;
		this.currentAlbum = album;
		this.props.onChangeAlbum(album);
		this.scrollTo({index: 0, animate: false});
	}

	onClickItem = (index) => () => {
		if (this.showOverlay) {
			this.props.toggleItem(index);
		}
	}

	createMockItem = (album) => {
		const
			dataLength = this.props.data.length,
			title = (dataLength % 8 === 0) ? ' with long title' : '',
			subTitle = (dataLength % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle',
			color = Math.floor((Math.random() * 0xEFEFF0) + 0x101010).toString(16);

		return {
			selected: false,
			text: album + ' ' + dataLength + title,
			subText: subTitle,
			url: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + dataLength,
			bgColor: '#' + color,
			selectionEnable: this.showOverlay
		};
	}

	renderItem = ({index, key}) => {
		const item = this.props.data[index];

		return (
			<GridListImageItem
				key={key}
				caption={item.text}
				source={item.url}
				subCaption={item.subText}
				selected={item.selected}
				selectionOverlayShowing={item.selectionEnable}
				onClick={this.onClickItem(index)}
				className={css.gridListItem}
			/>
		);
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	focusOnItem = (index) => {
		startJob('focusing', () => {
			const item = doc.querySelector(`[data-my-list] [data-index='${index}'].spottable`);

			if (item) {
				Spotlight.setPointerMode(false);
				Spotlight.focus(item);
			}
		}, 0);
	}

	componentDidMount () {
		// Below is an example of using scrollTo method for setting an "initial" position of VirtualList.
		// It is a substitute for focusOnIndex, setInitialFocusIndex, and scrollToItem of enyo.
		this.scrollTo({index: 60, animate: false});
		// Also you can focus an item by index like below.
		this.focusOnItem(60);
	}

	render = () => {
		const
			deleteButton = this.showOverlay ? <Button small onClick={this.props.deleteItem}>Delete</Button> : null,
			seleteAllButton = this.showOverlay ? <Button small onClick={this.props.selectAll}>Select All</Button> : null,
			showPreviousButton = this.showOverlay ? <IconButton tooltipPosition="above" tooltipText="Go To Previous" small onClick={this.showSelectionOverlayHandler}>rollbackward</IconButton> : null,
			selectionButton = !this.showOverlay ? <IconButton tooltipPosition="above" tooltipText="Selection" small onClick={this.showSelectionOverlayHandler}>check</IconButton> : null,
			addButton = !this.showOverlay ? <IconButton tooltipText="Add Item" small onClick={this.addItem}>plus</IconButton> : null;

		return (
			<div className={css.mainView}>
				<Header title="My Gallery">
					{addButton}
					{selectionButton}
					{deleteButton}
					{seleteAllButton}
					{showPreviousButton}
				</Header>
				<div className={css.content}>
					<SideBar
						albums={albums}
						className={css.sideBar}
						onAlbumChange={this.onChange}
						selectedAlbum={this.currentAlbum}
					/>
					<VirtualGridList
						cbScrollTo={this.getScrollTo}
						className={css.list}
						component={this.renderItem}
						data={this.props.data}
						data-my-list
						dataSize={this.props.data.length}
						itemSize={{minWidth: ri.scale(180), minHeight: ri.scale(270)}}
						spacing={ri.scale(21)}
					/>
				</div>
			</div>
		);
	}
}

export default AppStateDecorator(MainView);
