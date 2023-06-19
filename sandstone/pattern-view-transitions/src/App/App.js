import {flushSync} from 'react-dom';

import ImageItem from '@enact/sandstone/ImageItem';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
// import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
// import {Cell, Layout} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {useCallback, useEffect, useRef, useState} from 'react';

import videos from './videos.js';

import css from './App.module.less';

const AppBase = (props) => {
	const [orientation, setOrientation] = useState(window.screen.orientation.type);

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
	}, [window.screen.orientation.type]);

	const scrollToRef = useRef(null);

	useEffect(() => {
		scrollToRef.current({animate: false, focus: true, index: 2});
	}, []);

	const getScrollTo = useCallback((scrollTo) => {
		scrollToRef.current = scrollTo;
	}, []);

	const renderItem = useCallback(({index}) => {
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

	return (
		<div className={css.app}>
			<VirtualGridList
				{...props}
				cbScrollTo={getScrollTo}
				dataSize={videos.length}
				itemRenderer={renderItem}
				itemSize={{minWidth: ri.scale(702), minHeight: ri.scale(450)}} // FHD: 312 x 300, UHD: 624 x 600
				scrollMode="translate"
				spacing={30}
			/>
		</div>
	);

	// return (
	// 	<Layout {...rest} className={className + ' ' + css.app}>
	// 		{videos.map((video) =>
	// 			<Cell key={video.id} size="30%">
	// 				<VideoPlayer className={css.player + ' enact-fit'} noAutoPlay>
	// 					<source src={video.source} type="video/mp4" />
	// 					<infoComponents>
	// 						{video.desc}
	// 					</infoComponents>
	// 				</VideoPlayer>
	// 			</Cell>
	// 		)}
	// 	</Layout>
	// );
};

const App = ThemeDecorator(AppBase);

export default App;
export {App, AppBase};
