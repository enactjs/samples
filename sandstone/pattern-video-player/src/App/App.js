/* eslint-disable react/jsx-no-bind */

import Button from '@enact/sandstone/Button';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import {Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import Spotlight from '@enact/spotlight';
import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from 'react';

import ItemPanel from '../views/ItemPanel';
import MainPanel from '../views/MainPanel';

import videos from './videos.js';

import css from './App.module.less';

const getVideo = (index) => videos[index];

const AppBase = ({className, ...rest}) => {
	const [panelIndex, setPanelIndex] = useState(rest.panelIndex);
	const [panelsVisible, setPanelsVisible] = useState(false);
	const [videoIndex, setVideoIndex] = useState(rest.videoIndex);
	const videoRef = useRef(null);

	useEffect(() => {
		// After displaying the panels, move the focus to the main panel
		if (panelsVisible) {
			Spotlight.focus('main-panel');
		}
	}, [panelsVisible]);

	const handleNextPanelClick = () => setPanelIndex(prevPanelIndex => (prevPanelIndex + 1));
	const handleBack = ({index}) => setPanelIndex(index);
	const handleHidePanelsClick = () => setPanelsVisible(false);
	const handleShowPanelsClick = () => {
		videoRef.current.hideControls();
		setPanelsVisible(true);
	};
	const handleVideoIndexChange = (index) => setVideoIndex(index);
	const {source, desc, ...restVideo} = getVideo(videoIndex);
	delete rest.panelIndex;
	delete rest.videoIndex;

	return (
		<div {...rest} className={className + ' ' + css.app}>
			<VideoPlayer {...restVideo} className={css.player + ' enact-fit'} ref={videoRef} spotlightDisabled={panelsVisible}>
				<source src={source} type="video/mp4" />
				<infoComponents>
					{desc}
				</infoComponents>
				<MediaControls actionGuideLabel="Press Down Button">
					<Button
						icon="list"
						backgroundOpacity="transparent"
						onClick={handleShowPanelsClick}
						spotlightDisabled={panelsVisible}
					/>
				</MediaControls>
			</VideoPlayer>
			{panelsVisible ?
				<Panels
					index={panelIndex}
					onBack={handleBack}
				>
					<MainPanel
						onHidePanels={handleHidePanelsClick}
						onNextPanel={handleNextPanelClick}
						onVideoIndexChange={handleVideoIndexChange}
						spotlightId="main-panel"
						title="Videos"
						videoIndex={videoIndex}
					/>
					<ItemPanel title="Second" />
				</Panels> :
				null}
		</div>
	);
};

AppBase.propTypes = {
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

AppBase.defaultProps = {
	panelIndex: 0,
	videoIndex: 0
};

const App = ThemeDecorator(AppBase);

export default App;
export {App, AppBase};
