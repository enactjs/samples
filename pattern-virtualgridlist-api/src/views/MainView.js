import React from 'react';
import {createStore} from 'redux';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import {Header} from '@enact/moonstone/Panels';
import IconButton from '@enact/moonstone/IconButton';
import SideBar from '../components/SideBar';
import {GridListImageItem, VirtualGridList} from '@enact/moonstone/VirtualList';
import ri from '@enact/ui/resolution';
import {Spotlight} from '@enact/spotlight';
import {startJob} from '@enact/core/jobs';

import css from './MainView.less';

const albums = ['Family', 'Video', 'Travel'];

const updateState = (album) => {
	let
		records = [],
		title, subTitle, color;

	for (let idx = 0; idx < 500; ++idx) {
		title = (idx % 8 === 0) ? ' with long title' : '';
		subTitle = (idx % 8 === 0) ? 'Lorem ipsum dolor sit amet' : 'Subtitle';
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16);

		records.push({
			selected: false,
			text: album + ' ' + idx + title,
			subText: subTitle,
			url: 'http://placehold.it/300x300/' + color + '/ffffff&text=Image ' + idx,
			bgColor: '#' + color
		});
	}

	return records;
}

// Reducers
const types = {
	ADD_ITEM: 'ADD_ITEM',
	DELETE_ITEM: 'DELETE_ITEM',
	SELECTION_ENABLE: 'SELECTION_ENABLE',
	SELECT_ALL: 'SELECT_ALL',
	TOGGLE_ITEM: 'TOGGLE_ITEM',
	CHANGE_ALBUM: 'CHANGE_ALBUM'
};

const reducer = (state = [], action) => {
	switch (action.type) {
		case types.ADD_ITEM:
			return [action.item, ...state];
		case types.DELETE_ITEM:
			return state.filter(item => !item.selected);
		case types.SELECTION_ENABLE:
			return state.map(item => ({...item, selectionEnable: !item.selectionEnable}));
		case types.SELECT_ALL:
			return state.map(item => ({...item, selected: !item.selected}));
		case types.TOGGLE_ITEM:
			return state.map((item, index) => (index !== action.index) ? item : {...item, selected: !item.selected});
		case types.CHANGE_ALBUM:
			return updateState(action.album);
		default:
			return state;
	}
};

const addItem = (item) => ({type: types.ADD_ITEM, item});
const toggleItem = (index) => ({type: types.TOGGLE_ITEM, index});

class MainView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			album: albums[0]
		};
		this.store = createStore(reducer, updateState(this.state.album));
		this.showOverlay = false;
		this.unsubscribe = this.store.subscribe(this.updateData);
	}

	scrollTo = null

	updateData = () => {
		this.setState({data: this.store.getState()});
	}

	toggleItem = (id) => {
		return this.store.dispatch(toggleItem(id));
	}

	addItem = () => {
		const item = this.createMockItem(this.state.album);
		this.store.dispatch(addItem(item));
	}

	deleteItem = () => this.store.dispatch({type: types.DELETE_ITEM});

	selectAll = () => this.store.dispatch({type: types.SELECT_ALL});

	getChildForIndex = (index) => {
		return document.querySelector(`div[data-index='${index}']`);
	}

	showSelectionOverlayHandler = () => {
		this.showOverlay = !this.showOverlay;
		return this.store.dispatch({type: types.SELECTION_ENABLE});
	}

	renderItem = ({index, key}) => {
		const data = this.store.getState();
		return (
			<GridListImageItem
				key={key}
				caption={data[index].text}
				source={data[index].url}
				subCaption={data[index].subText}
				selected={data[index].selected}
				selectionOverlayShowing={data[index].selectionEnable}
				onClick={() => this.toggleItem(index)}
				className={css.gridListItem}
			/>
		);
	}

	onChange = (ev) => {
		const album = ev.value;
		this.setState({album: album});
		this.store.dispatch({type: types.CHANGE_ALBUM, album});
	}

	createMockItem = (album) => {
		const
			dataLength = this.store.getState().length,
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

	componentDidMount () {
		//focusOnIndex, setInitialFocusIndex, scrollToItem
		this.scrollTo({index: 60, animate: false});
		startJob('', () => {
			Spotlight.focus('div[data-index="60"]');
		}, 1000)
	}

	getScrollTo = (fn) => {
		this.scrollTo = fn;
	}

	render = () => {
		const
			data = this.store.getState(),
			deleteButton = this.showOverlay ? <Button onClick={this.deleteItem}>Delete</Button> : null,
			seleteAllButton = this.showOverlay ? <Button onClick={this.selectAll}>Select All </Button> : null,
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
						data={data}
						dataSize={data.length}
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

export default MainView;
