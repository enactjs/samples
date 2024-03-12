import {ImageItem} from '@enact/sandstone/ImageItem';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {useCallback, useState, useEffect} from 'react';

const defaultSize = 10;

const InfiniteScrollList = (props) => {
	const [items, setItems] = useState([]);
	const [dataSize, setDataSize] = useState(0);
	const [isFetching, setIsFetching] = useState(false);

	const createInitialData = useCallback((itemSize) => {
		const newItems = Array.from(items);

		for (let i = 0; i < itemSize; i++) {
			const text = `Item ${i}`,
				subText = `SubItem ${i}`,
				color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16),
				source = `https://placehold.co/300x300/` + color + '/ffffff/png?text=Image+' + i;

				newItems.push({text, subText, source});
		}
		setItems(newItems);
		setDataSize(newItems.length);
	}, [items]);

	const loadMoreData = useCallback(() => {
		// Inside this function, you can fetch data from your API server.
		// Here, assuming that the fetch is successful, we only proceed with attaching the data.

		const newItems = Array.from(items);
		for (let i = dataSize; i < dataSize + defaultSize; i++) {
			const text = `Item ${i}`,
				subText = `SubItem ${i}`,
				color = Math.floor(Math.random() * (0x1000000 - 0x101010) + 0x101010).toString(16),
				source = `https://placehold.co/300x300/` + color + '/ffffff/png?text=Image+' + i;

			newItems.push({text, subText, source});
		}
		setItems(newItems);
		setDataSize(newItems.length);
	}, [items, dataSize]);

	const renderItem = useCallback(({index, ...rest}) => {
		const {text, subText, source} = items[index];
		return (
			<ImageItem {...rest} label={subText} src={source}>
				{text}
			</ImageItem>
		);
	}, [items]);

	const handleScrollStop = useCallback((event) => {
		const reachedBottom = event.reachedEdgeInfo.bottom;

		if(reachedBottom) {
			setIsFetching(true);
		};
	}, []);

	useEffect(() => {
		createInitialData(defaultSize);
	}, [createInitialData]);

	useEffect(() => {
		if(isFetching) {
			loadMoreData();
			setIsFetching(false);
		}
	}, [isFetching, loadMoreData]);

	return (
		<VirtualGridList
			dataSize={dataSize}
			itemRenderer={renderItem}
			itemSize={{minHeight: ri.scale(570), minWidth: ri.scale(688)}}
			onScrollStop={handleScrollStop}
			{...props}
		/>
	)
}

export default InfiniteScrollList;