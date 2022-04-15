import kind from '@enact/core/kind';
import {ImageItem} from '@enact/sandstone/ImageItem';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';

const items = [];
// eslint-disable-next-line enact/prop-types
const renderItem = ({index, ...rest}) => {
	const {caption, src} = items[index];

	return (
		<ImageItem
			{...rest}
			src={src}
		>
			{caption}
		</ImageItem>
	);
};

for (let i = 0; i < 12; i++) {
	const
		count = ('0' + i).slice(-2),
		caption = `Item ${count} caption`,
		color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
		src = {
			'hd': `https://via.placeholder.com/200x200/${color}/ffffff/png?text=Image+${i}`,
			'fhd': `https://via.placeholder.com/300x300/${color}/ffffff/png?text=Image+${i}`,
			'uhd': `https://via.placeholder.com/600x600/${color}/ffffff/png?text=Image+${i}`
		};

	items.push({caption, src});
}

const SamplePage = kind({
	name: 'SamplePage',

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

export default SamplePage;
