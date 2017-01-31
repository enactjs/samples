import React from 'react';
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
		onChangeAlbum: React.PropTypes.func
	}

	onChange = (ev) => {
		const album = ev.value;
		this.props.onChangeAlbum(album);
		this.scrollTo({index: 0, animate: false});
		this.focusOnItem(0);
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
		const {album} = this.props;

		return (
			<div className={css.mainView}>
				<GalleryPanelHeader title="My Gallery"/>
				<div className={css.content}>
					<SideBar
						albums={albums}
						className={css.sideBar}
						onAlbumChange={this.onChange}
						selectedAlbum={album}
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
