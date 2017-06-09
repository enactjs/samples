import React from 'react';
import PropTypes from 'prop-types';
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
		index: PropTypes.number,
		videoIndex: PropTypes.number
	}

	static defaultProps = {
		index: 0,
		videoIndex: 0
	}

	constructor (props) {
		super(props);

		this.state = {
			index: this.props.index,
			panelsVisible: true,
			videoIndex: this.props.videoIndex
		};
	}

	handleSelectBreadcrumb = ({index}) => this.setState({index})

	handleClick = () => this.setState({index: this.state.index + 1})

	handleShowPanelsClick = () => this.setState({panelsVisible: true})
	handleHidePanelsClick = () => this.setState({panelsVisible: false})

	setVideoIndex = (videoIndex) => this.setState({videoIndex})

	render () {
		const {className, ...rest} = this.props;
		const {source, desc, ...restVideo} = getVideo(this.state.videoIndex);
		delete rest.index;
		delete rest.videoIndex;
		return (
			<div {...rest} className={className + ' ' + css.app}>
				<VideoPlayer {...restVideo} className={css.player + ' enact-fit'}>
					<source src={source} type="video/mp4" />
					<infoComponents>
						{desc}
					</infoComponents>
					<rightComponents>
						<IconButton backgroundOpacity="translucent" onClick={this.handleShowPanelsClick}>list</IconButton>
					</rightComponents>
				</VideoPlayer>
				{this.state.panelsVisible ?
					<AlwaysViewingPanels onSelectBreadcrumb={this.handleSelectBreadcrumb} index={this.state.index}>
						<MainPanel title="Videos" videoIndex={this.state.videoIndex} setVideoIndex={this.setVideoIndex} hidePanels={this.handleHidePanelsClick} nextPanel={this.handleClick} />
						<ItemPanel title="Second" onClick={this.handleClick} />
					</AlwaysViewingPanels> :
				null}
			</div>
		);
	}
}

export default MoonstoneDecorator(App);
