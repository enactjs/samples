import kind from '@enact/core/kind';
import {ImageItem} from '@enact/sandstone/ImageItem';
import Spinner from '@enact/sandstone/Spinner';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';

import photo from './placeholder.jpg';

const items = [];
// eslint-disable-next-line enact/prop-types
const renderItem = () => {
	return (
		<>
			<ImageItem
				src={photo}
			>
				Loading...
			</ImageItem>
			<Spinner
				style={{position: 'absolute', top: '50%', left: '50%', margin: '-63px 0 0 -39px'}}
				transparent />
		</>
	);
};

for (let i = 0; i < 12; i++) {
	const
		src = {
			hd: 'https://via.placeholder.com/200x200/7ed31d/ffffff',
			fhd: 'https://via.placeholder.com/300x300/7ed31d/ffffff',
			uhd: 'https://via.placeholder.com/600x600/7ed31d/ffffff'
		};

	items.push({src});
}

const SkeletonPage = kind({
	name: 'SkeletonPage',

	render: () => (
		<VirtualGridList
			dataSize={items.length}
			itemRenderer={renderItem}
			itemSize={{
				minWidth: ri.scale(540),
				minHeight: ri.scale(450)
			}}
		/>
	)
});

export default SkeletonPage;
