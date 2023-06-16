import {flushSync} from 'react-dom';

import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import {Cell} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {useCallback, useEffect, useRef, useState} from 'react';

import videos from './videos.js';

import css from './App.module.less';

const AppBase = (props) => {
	const [orientation, setOrientation] = useState(window.screen.orientation.type);

	useEffect(() => {
		const newOrientation = window.screen.orientation.type;

		document.startViewTransition(() => {
			flushSync(() => {
				setOrientation(newOrientation);
			});
		});
	}, [orientation]);

	const scrollToRef = useRef(null);

	useEffect(() => {
		scrollToRef.current({animate: false, focus: true, index: 2});
	}, []);

	const getScrollTo = useCallback((scrollTo) => {
		scrollToRef.current = scrollTo;
	}, []);

	const renderItem = useCallback(({index}) => {
		return (
			<Cell>
				<VideoPlayer className={css.player + ' enact-fit'} noAutoPlay poster={videos[index].poster}>
					<source src={videos[index].source} type="video/mp4" />
				</VideoPlayer>
			</Cell>
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
};

const App = ThemeDecorator(AppBase);

export default App;
export {App, AppBase};
