import Button from '@enact/sandstone/Button';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import {Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import Spotlight from '@enact/spotlight';
import PropTypes from 'prop-types';
import {Component} from 'react';

import ItemPanel from '../views/ItemPanel';
import MainPanel from '../views/MainPanel';

import videos from './videos.js';

import css from './App.module.less';

const getVideo = (index) => videos[index];

class AppBase extends Component {
	static propTypes = {
		/**
		 * Assign an alternate panel index to start on.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		panelIndex: PropTypes.number,

		/**
		 * Assign an alternate initial video to load first.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		videoIndex: PropTypes.number
	};

	static defaultProps = {
		panelIndex: 0,
		videoIndex: 0
	};

	constructor (props) {
		super(props);

		this.state = {
			panelIndex: this.props.panelIndex,
			panelsVisible: false,
			videoIndex: this.props.videoIndex
		};
	}

	componentDidUpdate (prevProps, prevState) {
		// After displaying the panels, move the focus to the main panel
		if (!prevState.panelsVisible && this.state.panelsVisible) {
			Spotlight.focus('main-panel');
		}
	}

	handleNextPanelClick = () => this.setState(prevState => ({panelIndex: prevState.panelIndex + 1}));

	handleSelectBreadcrumb = ({index}) => this.setState({panelIndex: index});

	handleHidePanelsClick = () => this.setState({panelsVisible: false});

	handleShowPanelsClick = () => {
		this.videoRef.hideControls();
		this.setState({panelsVisible: true});
	};

	setVideoIndex = (videoIndex) => this.setState({videoIndex});

	setVideoRef = (ref) => {
		this.videoRef = ref;
	};

	render () {
		const {className, ...rest} = this.props;
		const {source, desc, ...restVideo} = getVideo(this.state.videoIndex);
		delete rest.panelIndex;
		delete rest.videoIndex;
		return (
			<div {...rest} className={className + ' ' + css.app}>
				<VideoPlayer {...restVideo} className={css.player + ' enact-fit'} ref={this.setVideoRef} spotlightDisabled={this.state.panelsVisible}>
					<source src={source} type="video/mp4" />
					<infoComponents>
						{desc}
					</infoComponents>
					<MediaControls actionGuideLabel="Press Down Button">
						<Button
							icon="list"
							backgroundOpacity="transparent"
							onClick={this.handleShowPanelsClick}
							spotlightDisabled={this.state.panelsVisible}
						/>
					</MediaControls>
				</VideoPlayer>
				{this.state.panelsVisible ?
					<Panels
						index={this.state.panelIndex}
						onBack={this.handleSelectBreadcrumb}
					>
						<MainPanel
							onHidePanels={this.handleHidePanelsClick}
							onNextPanel={this.handleNextPanelClick}
							onVideoIndexChange={this.setVideoIndex}
							spotlightId="main-panel"
							title="Videos"
							videoIndex={this.state.videoIndex}
						/>
						<ItemPanel title="Second" />
					</Panels> :
					null}
			</div>
		);
	}
}

const App = ThemeDecorator(AppBase);

export default App;
export {App, AppBase};
