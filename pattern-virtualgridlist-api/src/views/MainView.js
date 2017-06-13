import React from 'react';
import PropTypes from 'prop-types';

import GalleryPanelHeader from '../components/GalleryPanelHeader';
import ImageList from '../components/ImageList';
import SideBar from '../components/SideBar';

import AppStateDecorator from './AppStateDecorator';
import css from './MainView.less';

const albums = ['Family', 'Car', 'Travel'];

class MainView extends React.Component {
	static propTypes = {
		album: PropTypes.string,
		onChangeAlbum: PropTypes.func
	}

	componentDidMount () {
		// Below is an example of using scrollTo method for setting an "initial" position of VirtualList.
		// It is a substitute for focusOnIndex, setInitialFocusIndex, and scrollToItem of enyo.
		this.scrollTo({index: 60, animate: false, focus: true});
	}

	componentDidUpdate () {
		this.scrollTo({index: 0, animate: false, focus: true});
	}

	onChange = (ev) => {
		const album = ev.value;
		this.props.onChangeAlbum(album);
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	render = () => {
		const {album} = this.props;

		return (
			<div className={css.mainView}>
				<GalleryPanelHeader title="My Gallery" />
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
