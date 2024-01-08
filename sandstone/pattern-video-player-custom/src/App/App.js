import Button from '@enact/sandstone/Button';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import {Panels} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import Hls from 'hls.js';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useRef, useState} from 'react';

import MainPanel from '../views/MainPanel';

import videos from './videos.js';

import css from './App.module.less';

const getVideo = (index) => videos[index];

const AppBase = ({className, videoId, ...rest}) => {
	const [panelsVisible, setPanelsVisible] = useState(false);
	const [videoIndex, setVideoIndex] = useState(videoId);
	const hlsRef = useRef(null);
	const videoRef = useRef(null);

	const handleHidePanelsClick = useCallback(() => setPanelsVisible(false), []);
	const handleShowPanelsClick = useCallback(() => {
		videoRef.current.hideControls();
		setPanelsVisible(true);
	}, []);
	const handleVideoIndexChange = useCallback((index) => setVideoIndex(index), []);
	const {source, type, desc, ...restVideo} = getVideo(videoIndex);

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
		}
	}, [source, type]);

	return (
		<div {...rest} className={className + ' ' + css.app}>
			<VideoPlayer {...restVideo} className={css.player + ' enact-fit'} ref={videoRef} spotlightDisabled={panelsVisible}>
				<source src={source} type={type} />
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
				<Panels>
					<MainPanel
						onHidePanels={handleHidePanelsClick}
						onVideoIndexChange={handleVideoIndexChange}
						title="Videos"
						videoIndex={videoIndex}
					/>
				</Panels> :
				null}
		</div>
	);
};

AppBase.propTypes = {
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
	videoId: 0
};

const App = ThemeDecorator(AppBase);

export default App;
export {App, AppBase};
