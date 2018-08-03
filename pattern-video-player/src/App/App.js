import IconButton from '@enact/moonstone/IconButton';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {AlwaysViewingPanels} from '@enact/moonstone/Panels';
import VideoPlayer, {MediaControls} from '@enact/moonstone/VideoPlayer';
import Spotlight from '@enact/spotlight';
import PropTypes from 'prop-types';
import React from 'react';

import ItemPanel from '../views/ItemPanel';
import MainPanel from '../views/MainPanel';

import css from './App.less';
import videos from './videos.js';

const getVideo = (index) => videos[index];

class App extends React.Component {
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
	}

	static defaultProps = {
		panelIndex: 0,
		videoIndex: 0
	}

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

	handleNextPanelClick = () => this.setState(prevState => ({panelIndex: prevState.panelIndex + 1}))

	handleSelectBreadcrumb = ({index}) => this.setState({panelIndex: index})

	handleHidePanelsClick = () => this.setState({panelsVisible: false})

	handleShowPanelsClick = () => {
		this.videoRef.hideControls();
		this.setState({panelsVisible: true});
	}

	setVideoIndex = (videoIndex) => this.setState({videoIndex})

	setVideoRef = (ref) => {
		this.videoRef = ref;
	}

	render () {
		const {className, ...rest} = this.props;
		const {source, desc, ...restVideo} = getVideo(this.state.videoIndex);
		delete rest.panelIndex;
		delete rest.videoIndex;
		return (
			<div {...rest} className={className + ' ' + css.app}>
				<VideoPlayer ref={this.setVideoRef} spotlightDisabled={this.state.panelsVisible} {...restVideo} className={css.player + ' enact-fit'}>
					<source src={source} type="video/mp4" />
					<infoComponents>
						{desc}
					</infoComponents>
					<MediaControls>
						<rightComponents>
							<IconButton
								backgroundOpacity="translucent"
								onClick={this.handleShowPanelsClick}
								spotlightDisabled={this.state.panelsVisible}
							>
								list
							</IconButton>
						</rightComponents>
					</MediaControls>
				</VideoPlayer>
				{this.state.panelsVisible ?
					<AlwaysViewingPanels
						onSelectBreadcrumb={this.handleSelectBreadcrumb}
						index={this.state.panelIndex}
					>
						<MainPanel
							onVideoIndexChange={this.setVideoIndex}
							onHidePanels={this.handleHidePanelsClick}
							onNextPanel={this.handleNextPanelClick}
							spotlightId="main-panel"
							title="Videos"
							videoIndex={this.state.videoIndex}
						/>
						<ItemPanel title="Second" />
					</AlwaysViewingPanels> :
					null}
			</div>
		);
	}
}

export default MoonstoneDecorator(App);
