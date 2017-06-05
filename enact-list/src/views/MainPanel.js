import React from 'react';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
import LocaleSwitch from '../components/LocaleSwitch';

import {VirtualList, VirtualGridList} from '@enact/moonstone/VirtualList';
import Item from '@enact/moonstone/Item';

const
	style = {
		item: {
			borderBottom: 2 + 'px solid #202328',
			boxSizing: 'border-box',
			position: 'absolute'
		},
		list: {
			display: 'inline-block',
			width: '50%',
			height: '552px'
		}
	},
	items = [],
	isItemDisabled = (index) => !(index % 5 === 0),
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
	renderHorizontalItem = ({data, index, ...rest}) => {
		const itemStyle = {width: '100px', height: '100%', overflow: 'hidden', ...style.item};
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
				<VirtualList
					component={renderItem}
					data={items}
					dataSize={items.length}
					isItemDisabled={isItemDisabled}
					itemSize={itemSize}
					style={style.list}
				/>
				<VirtualGridList
					component={renderItem}
					data={items}
					dataSize={items.length}
					isItemDisabled={isItemDisabled}
					itemSize={{minWidth: 100, minHeight: 100}}
					style={style.list}
				/>
				<VirtualList
					component={renderHorizontalItem}
					data={items}
					dataSize={items.length}
					direction="horizontal"
					isItemDisabled={isItemDisabled}
					itemSize={itemSize}
					style={{height: '200px'}}
				/>
			</Panel>
		);
	}
});

export default MainPanel;
