import {flushSync} from 'react-dom';

import Button from '@enact/sandstone/Button';
import ImageItem from '@enact/sandstone/ImageItem';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import {Cell, Layout} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {useCallback, useEffect, useState} from 'react';

import videos from './videos.js';

import css from './App.module.less';

const AppBase = (props) => {
	const [orientation, setOrientation] = useState(window.screen.orientation.type);
	const [video, setVideo] = useState(false);

	useEffect(() => {
		if (orientation === ('portrait-primary' || 'portrait-secondary')) {
			document.startViewTransition(() => {
				flushSync(() => {
					setOrientation('landscape-primary');
				});
			});
		} else if (orientation === ('landscape-primary' || 'landscape-secondary')) {
			document.startViewTransition(() => {
				flushSync(() => {
					setOrientation('portrait-primary');
				});
			});
		}
	}, [window.screen.orientation.type]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleClick = useCallback(() => {
		document.startViewTransition(() => {
			flushSync(() => {
				setVideo(!video);
			});
		});
	}, [video]);

	const renderImage = useCallback(({index}) => {
		const getOrientation = window.screen.orientation.type;
		return (
			getOrientation === ('landscape-primary' || 'landscape-secondary') ?
				<ImageItem className={css.player + `-${index}`} src={videos[index].poster}>
					{videos[index].title}
				</ImageItem>
			: getOrientation === ('portrait-primary' || 'portrait-secondary') ?
				<ImageItem className={css.image + `-${index}`} src={videos[index].poster}>
					{videos[index].title}
				</ImageItem>
			: null
		);
	}, []);

	const renderVideo = useCallback(({index}) => {
		return (
			<VideoPlayer
				className={css.video + `-${index}`}
				feedbackHideDelay={0}
				muted
				noAutoPlay poster={videos[index].poster}
				noAutoShowMediaControls
				style={{height: '100%'}}>
				<source src={videos[index].source} type="video/mp4" />
			</VideoPlayer>
		);
	}, []);

	return (
		<div className={css.app}>
			<Layout align="center" className={css.appLayout} orientation="vertical">
				<Cell className={video ? css.videoCell : ''}>
					<VirtualGridList
						{...props}
						dataSize={videos.length}
						itemRenderer={!video ? renderImage : renderVideo}
						itemSize={{minWidth: ri.scale(600), minHeight: ri.scale(360)}} // FHD: 312 x 300, UHD: 624 x 600
						scrollMode="translate"
						spacing={15}
					/>
				</Cell>
				<Cell className={css.buttonCell} shrink>
					<Button className={css.revealButton} onClick={handleClick} size="small">
						{!video ? 'Reveal videos' : 'Hide videos'}
					</Button>
				</Cell>
			</Layout>
		</div>
	);
};

const App = ThemeDecorator(AppBase);

export default App;
export {App, AppBase};
