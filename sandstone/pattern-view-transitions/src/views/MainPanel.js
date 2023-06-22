import {flushSync} from 'react-dom';

import Button from '@enact/sandstone/Button';
import ImageItem from '@enact/sandstone/ImageItem';
import {MediaControls} from '@enact/sandstone/MediaPlayer';
import {Panel} from '@enact/sandstone/Panels';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import {Cell, Layout} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

import videos from '../App/videos';

import css from './MainPanel.module.less';

const MainPanel = (props) => {
	const [video, setVideo] = useState(false);

	const handleClick = useCallback(() => {
		document.startViewTransition(() => {
			flushSync(() => {
				setVideo(!video);
			});
		});
	}, [video]);

	const renderImage = useCallback(({index}) => {
		const orientation = window.screen.orientation.type;

		if (orientation === ('landscape-primary' || 'landscape-secondary')) {
			return (
				<ImageItem className={css.player + `-${index}`} src={videos[index].poster}>
					{videos[index].title}
				</ImageItem>
			);
		} else if (orientation === ('portrait-primary' || 'portrait-secondary')) {
			return (
				<ImageItem className={css.image + `-${index}`} src={videos[index].poster}>
					{videos[index].title}
				</ImageItem>
			);
		}
	}, []);

	const renderVideo = useCallback(({index}) => {
		return (
			<VideoPlayer
				className={css.video + `-${index}`}
				feedbackHideDelay={0}
				muted
				noAutoPlay poster={videos[index].poster}
				noAutoShowMediaControls
				noSlider
				pauseAtEnd
				style={{transform: 'scale(0.75)'}}
			>
				<source src={videos[index].source} type="video/mp4" />
				<MediaControls id={videos[index].id} noJumpButtons />
			</VideoPlayer>
		);
	}, []);

	return (
		<Panel {...props} className={css.main}>
			<Layout align="center" className={css.appLayout} orientation="vertical">
				<Cell className={css.videoCell}>
					<VirtualGridList
						{...props}
						dataSize={videos.length}
						itemRenderer={!video ? renderImage : renderVideo}
						itemSize={{minWidth: ri.scale(600), minHeight: ri.scale(360)}} // FHD: 312 x 300, UHD: 624 x 600
						scrollMode="translate"
						spacing={15}
						verticalScrollbar="hidden"
					/>
				</Cell>
				<Cell className={css.buttonCell} shrink>
					<Button className={css.revealButton} onClick={handleClick} size="small">
						{!video ? 'Reveal videos' : 'Hide videos'}
					</Button>
				</Cell>
			</Layout>
		</Panel>
	);
};

export default MainPanel;
