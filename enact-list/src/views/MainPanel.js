import React from 'react';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import LocaleSwitch from '../components/LocaleSwitch';

import {VirtualList, VirtualGridList} from '@enact/moonstone/VirtualList';
import {VirtualListFlexbox, VirtualGridListFlexbox} from '@enact/moonstone/VirtualList/VirtualListFlexbox';
// import {VirtualListNative as VirtualList, VirtualGridListNative as VirtualGridList} from '@enact/moonstone/VirtualList/VirtualListNative.js';
import Item from '@enact/moonstone/Item';

const
	style = {
		item: {
			borderBottom: 2 + 'px solid #202328',
			boxSizing: 'border-box',
			position: 'absolute',
			fontSize: '0.3rem'
		},
		itemFlex: {
			borderBottom: 2 + 'px solid #202328',
			boxSizing: 'border-box',
			fontSize: '0.3rem'
		},
		list: {
			display: 'inline-block',
			width: '50%',
			height: '552px'
		}
	},
	items = [],
	isItemDisabled = (index) => !(index % 5 === 0),
	isGridItemDisabled = (index) => false,// !(index % 20 === 0),
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = ({data, index, ...rest}) => {
		const itemStyle = {height: '72px', ...style.item};
		const disabled = isItemDisabled(index);

		return (
			<Item {...rest} disabled={disabled} style={itemStyle}>
				{data[index]}
			</Item>
		);
	},
	renderGridItem = ({data, index, ...rest}) => {
		const itemStyle = {height: '72px', ...style.item};
		const disabled = isGridItemDisabled(index);

		return (
			<Item {...rest} disabled={disabled} style={itemStyle}>
				{data[index]}
			</Item>
		);
	},
	renderGridFlexItem = ({data, index, ...rest}) => {
		// const itemStyle = {height: '72px', ...style.item};
		const itemStyle = {flex: '1 1 100px', height: '72px', ...style.itemFlex};
		const disabled = isGridItemDisabled(index);

		return (
			<Item {...rest} disabled={disabled} style={itemStyle}>
				{data[index]}
			</Item>
		);
	},
	renderHorizontalItem = ({data, index, ...rest}) => {
		const itemStyle = {width: '150px', height: '100%', ...style.item};
		const disabled = isItemDisabled(index);

		return (
			<Item {...rest} disabled={disabled} style={itemStyle}>
				{data[index]}
			</Item>
		);
	};

for (let i = 0; i < 1000; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
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
				<VirtualGridList
					component={renderGridItem}
					data={items}
					dataSize={items.length}
					isItemDisabled={isGridItemDisabled}
					itemSize={{minWidth: 100, minHeight: 100}}
					style={style.list}
				/>
				<VirtualGridListFlexbox
					component={renderGridFlexItem}
					data={items}
					dataSize={items.length}
					isItemDisabled={isGridItemDisabled}
					itemSize={{minWidth: 100, minHeight: 100}}
					style={style.list}
				/>
			</Panel>
		);
	}
});

export default MainPanel;
