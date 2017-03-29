import Item from '@enact/moonstone/Item';
import ri from '@enact/ui/resolution';
import React from 'react';
import Region from '@enact/moonstone/Region';
import VirtualList from '@enact/moonstone/VirtualList';

const
	style = {
		item: {
			borderBottom: ri.scale(2) + 'px solid #202328',
			boxSizing: 'border-box'
		},
		list: {
			height: ri.scale(852) + 'px'
		}
	},
	items = [],
	itemSize = ri.scale(72),
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = (size) => ({data, index, ...rest}) => {
		const
			itemStyle = {height: size + 'px', ...style.item},
			posinset = index + 1;

		return (
			<Item role='listitem' aria-setsize={data.length} aria-posinset={posinset} {...rest} style={itemStyle}>
				{data[index]}
			</Item>
		);
	};

for (let i = 0; i < 100; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

const VirtualListView = () => (
	<Region title='X of Y feature'>
		<VirtualList
			component={renderItem(itemSize)}
			data={items}
			dataSize={items.length}
			itemSize={itemSize}
			role='list'
			style={style.list}
		/>
	</Region>
);

export default VirtualListView;
