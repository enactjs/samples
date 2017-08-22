import React from 'react';
import PropTypes from 'prop-types';
import Spotlight from '@enact/spotlight';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {AlwaysViewingPanels} from '@enact/moonstone/Panels';
import VideoPlayer from '@enact/moonstone/VideoPlayer';
import IconButton from '@enact/moonstone/IconButton';

import ItemPanel from '../views/ItemPanel';
import MainPanel from '../views/MainPanel';

import videos from './videos.js';
import css from './App.less';

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
			panelsVisible: true,
			videoIndex: this.props.videoIndex
		};

		this.panelRef = null;
	}

	componentDidMount () {
		const containerId = this.panelRef.props.containerId;
		if (containerId) {
			Spotlight.setActiveContainer(containerId);
		}
	}

	componentDidUpdate (prevProps, prevState) {
		if (!prevState.panelsVisible && this.state.panelsVisible && this.panelRef && !Spotlight.getPointerMode()) {
			Spotlight.focus(this.panelRef.props.containerId);
		}
	}

	handleNextPanelClick = () => this.setState({panelIndex: this.state.panelIndex + 1})

	handleSelectBreadcrumb = ({index}) => this.setState({panelIndex: index})

	handleHidePanelsClick = () => this.setState({panelsVisible: false})

	handleMoreclick = () => this.state.panelsVisible ? this.setState({panelsVisible: false}) : this.setState({panelsVisible: true})

	setVideoIndex = (videoIndex) => this.setState({videoIndex})

	initPanelRef = (ref) => {
		this.panelRef = ref;
	};

	render () {
		const {className, ...rest} = this.props;
		const {source, desc, ...restVideo} = getVideo(this.state.videoIndex);
		delete rest.panelIndex;
		delete rest.videoIndex;
		return (
			<div {...rest} className={className + ' ' + css.app}>
				<VideoPlayer {...restVideo} className={css.player + ' enact-fit'}>
					<source src={source} type="video/mp4" />
					<infoComponents>
						{desc}
					</infoComponents>
					<rightComponents>
						<IconButton
							backgroundOpacity="translucent"
							onClick={this.handleMoreclick}
						>
							list
						</IconButton>
					</rightComponents>
				</VideoPlayer>
				{this.state.panelsVisible ?
					<AlwaysViewingPanels
						onSelectBreadcrumb={this.handleSelectBreadcrumb}
						index={this.state.panelIndex}
					>
						<MainPanel
							title="Videos"
							videoIndex={this.state.videoIndex}
							onVideoIndexChange={this.setVideoIndex}
							onHidePanels={this.handleHidePanelsClick}
							onNextPanel={this.handleNextPanelClick}
							ref={this.initPanelRef}
						/>
						<ItemPanel title="Second" />
					</AlwaysViewingPanels> :
					null}
			</div>
		);
	}
}

export default MoonstoneDecorator(App);
