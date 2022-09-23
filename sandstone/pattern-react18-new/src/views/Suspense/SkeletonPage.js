import kind from '@enact/core/kind';
import {ImageItem} from '@enact/sandstone/ImageItem';
import Spinner from '@enact/sandstone/Spinner';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';

import photo from './placeholder.jpg';

const renderItem = () => {
	return (
		<>
			<ImageItem
				src={photo}
			>
				Loading...
			</ImageItem>
			<Spinner
				style={{position: 'absolute', top: '50%', left: '50%', margin: '-20% 0 0 -12%'}}
				transparent
			/>
		</>
	);
};

const SkeletonPage = kind({
	name: 'SkeletonPage',

	render: () => (
		<VirtualGridList
			dataSize={6}
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(540),
				minHeight: ri.scale(450)
			}}
		/>
	)
});

export default SkeletonPage;
