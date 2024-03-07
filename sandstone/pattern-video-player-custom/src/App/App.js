import Button from '@enact/sandstone/Button';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import {Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import Hls from 'hls.js';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

import MainPanel from '../views/MainPanel';
import SubtitlePanel from '../views/SubtitlePanel';

import videos from './videos.js';

import css from './App.module.less';

const getVideo = (index) => videos[index];

const AppBase = ({className, subtitleId, videoId, ...rest}) => {
	const [subtitleIndex, setSubtitleIndex] = useState(subtitleId);
	const [subtitlePanelsVisible, setSubtitlePanelsVisible] = useState(false);
	const [videoIndex, setVideoIndex] = useState(videoId);
	const [videoPanelsVisible, setVideoPanelsVisible] = useState(false);
	const hlsRef = useRef(null);
	const videoRef = useRef(null);

	const handleHideSubtitlePanelsClick = useCallback(() => setSubtitlePanelsVisible(false), []);
	const handleHideVideoPanelsClick = useCallback(() => setVideoPanelsVisible(false), []);
	const handleShowSubtitlePanelsClick = useCallback(() => {
		videoRef.current.hideControls();
		setSubtitlePanelsVisible(true);
	}, []);
	const handleShowVideoPanelsClick = useCallback(() => {
		videoRef.current.hideControls();
		setVideoPanelsVisible(true);
	}, []);
	const handleSubtitleIndexChange = useCallback((index) => {
		setSubtitleIndex(index);
	}, []);
	const handleVideoIndexChange = useCallback((index) => {
		setVideoIndex(index);
		setSubtitleIndex(0);
	}, []);

	const {desc, source, subtitles, type, ...restVideo} = getVideo(videoIndex);
	const subtitle = subtitles[subtitleIndex - 1];

	const getHls = () => {
		if (hlsRef.current === null) {
			hlsRef.current = new Hls();
		}
		return hlsRef.current;
	};

	useEffect(() => {
		const hls = getHls();
		if (type === 'application/x-mpegURL') {
			hls.loadSource(source);
			hls.attachMedia(videoRef.current.getVideoNode().media);
		} else {
			hls.detachMedia();
			videoRef.current.getVideoNode().media.src = source;
		}
	}, [source, type]);

	useEffect(() => {
		const video = videoRef.current.getVideoNode().media;
		let track = document.getElementById('track');
		if (subtitle) {
			if (!document.getElementById('track')) {
				track = document.createElement('track');
				track.id = "track";
				video.appendChild(track);
			}
			video.textTracks[0].mode = "hidden";
			track.src = subtitle.file;
			track.kind = "subtitles";
			track.srclang = subtitle.lang;
			video.textTracks[0].mode = "showing";
		} else if (video.textTracks[0]) {
			video.textTracks[0].mode = "hidden";
		}
	}, [subtitle]);

	let PanelContent = null;

	if (subtitlePanelsVisible) {
		PanelContent = <Panels>
			<SubtitlePanel
				onHidePanels={handleHideSubtitlePanelsClick}
				onSubtitleIndexChange={handleSubtitleIndexChange}
				title="Subtitles"
				subtitleIndex={subtitleIndex}
				videoIndex={videoIndex}
			/>
		</Panels>;
	} else if (videoPanelsVisible) {
		PanelContent = <Panels>
			<MainPanel
				onHidePanels={handleHideVideoPanelsClick}
				onVideoIndexChange={handleVideoIndexChange}
				title="Videos"
				videoIndex={videoIndex}
			/>
		</Panels>;
	}

	return (
		<div {...rest} className={className + ' ' + css.app}>
			<VideoPlayer {...restVideo} className={css.player + ' enact-fit'} ref={videoRef} spotlightDisabled={videoPanelsVisible || subtitlePanelsVisible}>
				<source src={source} type={type} />
				<infoComponents>
					{desc}
				</infoComponents>
				<MediaControls actionGuideLabel="Press Down Button">
					<Button
						icon="list"
						backgroundOpacity="transparent"
						onClick={handleShowVideoPanelsClick}
						spotlightDisabled={videoPanelsVisible}
					/>
					<Button
						icon="subtitle"
						backgroundOpacity="transparent"
						onClick={handleShowSubtitlePanelsClick}
						spotlightDisabled={subtitlePanelsVisible}
					/>
				</MediaControls>
			</VideoPlayer>
			{PanelContent}
		</div>
	);
};

AppBase.propTypes = {
	/**
	 * Assign an alternate initial subtitle to load first.
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	subtitleId: PropTypes.number,

	/**
	 * Assign an alternate initial video to load first.
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	videoId: PropTypes.number
};

AppBase.defaultProps = {
	subtitleId: 0,
	videoId: 0
};

const App = ThemeDecorator(AppBase);

export default App;
export {App, AppBase};
