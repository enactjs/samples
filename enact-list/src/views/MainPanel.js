import React from 'react';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import LocaleSwitch from '../components/LocaleSwitch';

import {VirtualList, VirtualGridList} from '@enact/moonstone/VirtualList';
// import {VirtualListNative as VirtualList, VirtualGridListNative as VirtualGridList} from '@enact/moonstone/VirtualList/VirtualListNative.js';
import Item from '@enact/moonstone/Item';

const
	style = {
		item: {
			position: 'absolute',
			padding: '0',
			borderBottom: 2 + 'px solid #202328',
			boxSizing: 'border-box'
		},
		list: {
			display: 'inline-block',
			width: '50%',
			height: '552px'
		}
	},
	items = [],
	gridItems = [],
	isItemDisabled = (index) => !(index % 15 === 0),
	isGridItemDisabled = (index) => !(index % 40 === 0),
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = ({data, index, ...rest}) => {
		return (
			<Item {...rest} disabled={data[index].disabled} style={style.item}>
				{data[index].content}
			</Item>
		);
	},
	renderItem2 = ({data, index, ...rest}) => {
		return (
			<Item {...rest} disabled={data[index].disabled} style={{...style.item, width: '150px'}}>
				{data[index].content}
			</Item>
		);
	};

for (let i = 0; i < 1000; i++) {
	items.push({content: 'Item ' + ('00' + i).slice(-3), disabled: isItemDisabled(i)});
}

for (let i = 0; i < 1000; i++) {
	gridItems.push({content: 'Item ' + ('00' + i).slice(-3), disabled: isGridItemDisabled(i)});
}

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => {
		const itemSize = 72;

		return (
			<Panel {...props}>
				<Header title="Locale Switch" type="compact">
					<LocaleSwitch />
				</Header>
				<VirtualList
					component={renderItem}
					data={items}
					dataSize={items.length}
					itemSize={itemSize}
					style={style.list}
				/>
				<VirtualGridList
					component={renderItem}
					data={gridItems}
					dataSize={gridItems.length}
					itemSize={{minWidth: 100, minHeight: 100}}
					style={style.list}
				/>
				<VirtualList
					component={renderItem2}
					data={items}
					dataSize={items.length}
					direction="horizontal"
					itemSize={150}
					style={{height: '200px'}}
				/>
			</Panel>
		);
	}
});

export default MainPanel;
