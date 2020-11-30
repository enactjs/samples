import PropTypes from 'prop-types';
import React from 'react';

import GalleryPanelHeader from '../components/GalleryPanelHeader';
import ImageList from '../components/ImageList';
import SideBar from '../components/SideBar';

import AppStateDecorator from './AppStateDecorator';
import css from './MainView.module.less';

const albums = ['Family', 'Car', 'Travel'];

class MainView extends React.Component {
	static propTypes = {
		album: PropTypes.string,
		onChangeAlbum: PropTypes.func
	}

	componentDidMount () {
		// Below is an example of using scrollTo method for setting an "initial" position of VirtualList.
		// It is a substitute for focusOnIndex, setInitialFocusIndex, and scrollToItem of enyo.
		//this.scrollTo({index: 60, animate: false, focus: true});
	}

	componentDidUpdate () {
		//this.scrollTo({index: 0, animate: false, focus: true});
	}

	onChange = ({album}) => {
		this.props.onChangeAlbum(album);
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	render = () => {
		return (
			<div className={css.mainView}>
				<GalleryPanelHeader />
				<div className={css.content}>
					<SideBar
						albums={albums}
						className={css.sideBar}
						onAlbumChange={this.onChange}
						defaultSelected={0}
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
