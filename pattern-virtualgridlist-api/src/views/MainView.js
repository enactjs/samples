import React from 'react';

import SideBar from '../components/SideBar';
import ImageList from '../components/ImageList';
import GalleryPanelHeader from '../components/GalleryPanelHeader';

import AppStateDecorator from './AppStateDecorator';
import css from './MainView.less';

const albums = ['Family', 'Car', 'Travel'];

class MainView extends React.Component {
	static propTypes = {
		album: React.PropTypes.string,
		onChangeAlbum: React.PropTypes.func
	}

	onChange = (ev) => {
		const album = ev.value;
		this.props.onChangeAlbum(album);
		this.scrollTo({index: 0, animate: false, indexToFocus: 0});
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	componentDidMount () {
		// Below is an example of using scrollTo method for setting an "initial" position of VirtualList.
		// It is a substitute for focusOnIndex, setInitialFocusIndex, and scrollToItem of enyo.
		this.scrollTo({index: 60, animate: false, indexToFocus: 60});
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
					/>
				</div>
			</div>
		);
	}
}

export default AppStateDecorator(MainView);
