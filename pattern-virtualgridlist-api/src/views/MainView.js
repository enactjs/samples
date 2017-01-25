import Button from '@enact/moonstone/Button';
import {GridListImageItem, VirtualGridList} from '@enact/moonstone/VirtualList';
import {Header} from '@enact/moonstone/Panels';
import IconButton from '@enact/moonstone/IconButton';
import React from 'react';
import ri from '@enact/ui/resolution';
import {Spotlight} from '@enact/spotlight';
import {startJob} from '@enact/core/jobs';

import SideBar from '../components/SideBar';
import ImageList from '../components/ImageList';
import GalleryPanelHeader from '../components/GalleryPanelHeader';

import AppStateDecorator from './AppStateDecorator';
import css from './MainView.less';

const
	albums = ['Family', 'Car', 'Travel'],
	doc = (typeof window === 'object') ? window.document : {};

class MainView extends React.Component {
	
	static propTypes = {
		album: React.PropTypes.string,
		//addItem: React.PropTypes.func,
		//deleteItem: React.PropTypes.func,
		onChangeAlbum: React.PropTypes.func,
		//selectAll: React.PropTypes.func,
		//selectionEnable: React.PropTypes.func
	}

	/*addItem = () => {
		const item = this.createMockItem(this.props.album);
		this.props.addItem(item);
	}*/

	/*showSelectionOverlayHandler = () => {
		this.showOverlay = !this.showOverlay;
		this.props.selectionEnable();
	}*/

	onChange = (ev) => {
		const album = ev.value;
		this.props.onChangeAlbum(album);
		this.scrollTo({index: 0, animate: false});
		this.focusOnItem(0);
	}

	/*createMockItem = (album) => {
		const
			dataLength = 500,
			caption = (dataLength % 8 === 0) ? ' with long title' : '',
			subCaption = (dataLength % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle',
			color = Math.floor((Math.random() * 0xEFEFF0) + 0x101010).toString(16);

		return {
			selected: false,
			selectionOverlayShowing: this.showOverlay,
			caption: album + ' ' + dataLength + caption,
			subText: subCaption,
			source: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + dataLength
		};
	}*/

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

	/*buttonList = () => {
		const
			deleteButton = this.showOverlay ? <Button small onClick={this.props.deleteItem}>Delete</Button> : null,
			selectAllButton = this.showOverlay ? <Button small onClick={this.props.selectAll}>Select All</Button> : null,
			showPreviousButton = this.showOverlay ? <IconButton tooltipPosition="above" tooltipText="Go To Previous" small onClick={this.showSelectionOverlayHandler}>rollbackward</IconButton> : null,
			selectionButton = !this.showOverlay ? <IconButton tooltipPosition="above" tooltipText="Selection" small onClick={this.showSelectionOverlayHandler}>check</IconButton> : null,
			addButton = !this.showOverlay ? <IconButton tooltipText="Add Item" small onClick={this.addItem}>plus</IconButton> : null;

		return (
			deleteButton,
			selectAllButton,
			showPreviousButton,
			selectionButton,
			addButton
		);
	}
*/
	render = () => {
		/*const
			deleteButton = this.showOverlay ? <Button small onClick={this.props.deleteItem}>Delete</Button> : null,
			selectAllButton = this.showOverlay ? <Button small onClick={this.props.selectAll}>Select All</Button> : null,
			showPreviousButton = this.showOverlay ? <IconButton tooltipPosition="above" tooltipText="Go To Previous" small onClick={this.showSelectionOverlayHandler}>rollbackward</IconButton> : null,
			selectionButton = !this.showOverlay ? <IconButton tooltipPosition="above" tooltipText="Selection" small onClick={this.showSelectionOverlayHandler}>check</IconButton> : null,
			addButton = !this.showOverlay ? <IconButton tooltipText="Add Item" small onClick={this.addItem}>plus</IconButton> : null;*/

		return (
			<div className={css.mainView}>
				{/*<Header title="My Gallery">
					{deleteButton}
					{selectAllButton}
					{showPreviousButton}
					{addButton}
					{selectionButton}
				</Header>*/}
				<GalleryPanelHeader title="My Callery"/>
				<div className={css.content}>
					<SideBar
						albums={albums}
						className={css.sideBar}
						onAlbumChange={this.onChange}
						selectedAlbum={this.props.album}
					/>
					<ImageList
						cbScrollTo={this.getScrollTo}
						className={css.list}
						data-my-list
					/>
				</div>
			</div>
		);
	}
}

export default AppStateDecorator(MainView);
