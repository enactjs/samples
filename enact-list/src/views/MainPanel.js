import React from 'react';
import kind from '@enact/core/kind';
import {Panel, Header} from '@enact/moonstone/Panels';
// import Scroller from '@enact/moonstone/Scroller';
import {ScrollerNative as Scroller} from '@enact/moonstone/Scroller/ScrollerNative.js';
import LocaleSwitch from '../components/LocaleSwitch';

// import {VirtualList, VirtualGridList} from '@enact/moonstone/VirtualList';
import {VirtualListNative as VirtualList, VirtualGridListNative as VirtualGridList} from '@enact/moonstone/VirtualList/VirtualListNative.js';
import Item from '@enact/moonstone/Item';
const
	style = {
		item: {
			borderBottom: 2 + 'px solid #202328',
			boxSizing: 'border-box',
			position: 'absolute'
		},
		list: {
			display: 'inline-flex',
			width: '700px',
			height: '552px'
		},
		scroller: {
			height: 552 + 'px',
			width: '100%'
		},
		content: {
			height: 1002 + 'px',
			width: 2001 + 'px'
		},
		bottom: {
			marginTop: 801 + 'px'
		}
	},
	items = [],
	isItemDisabled = (index) => !(index % 5 === 0),
	isGridItemDisabled = (index) => !(index % 20 === 0),
	// eslint-disable-next-line enact/prop-types, enact/display-name
	renderItem = ({data, index, ...rest}) => {
		const itemStyle = {height: '72px', ...style.item};

		return (
			<Item {...rest} style={itemStyle}>
				{data[index]}
			</Item>
		);
	},
	renderGridItem = ({data, index, ...rest}) => {
		const itemStyle = {height: '72px', ...style.item};

		return (
			<Item {...rest} style={itemStyle}>
				{data[index]}
			</Item>
		);
	},
	renderHorizontalItem = ({data, index, ...rest}) => {
		const itemStyle = {width: '150px', height: '100%', ...style.item};

		return (
			<Item {...rest} style={itemStyle}>
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
				<div>
					{/*<VirtualList
						component={renderItem}
						data={items}
						dataSize={items.length}
						isItemDisabled={isItemDisabled}
						itemSize={itemSize}
						style={style.list}
					/>*/}
					<VirtualGridList
						component={renderGridItem}
						data={items}
						dataSize={items.length}
						// isItemDisabled={isGridItemDisabled}
						itemSize={{minWidth: 100, minHeight: 100}}
						style={style.list}
					/>
					{/*<VirtualList
						component={renderHorizontalItem}
						data={items}
						dataSize={items.length}
						direction="horizontal"
						isItemDisabled={isItemDisabled}
						itemSize={150}
						style={{height: '200px'}}
					/>*/}
					<Scroller
						direction="both"
						style={style.scroller}
						verticalScrollbar="visible"
						horizontalScrollbar="visible"
					>
						<div style={style.content}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
							Aenean id blandit nunc. Donec lacinia nisi vitae mi dictum, eget pulvinar nunc tincidunt. Integer vehicula tempus rutrum. Sed efficitur neque in arcu dignissim cursus.
							<div style={style.bottom}>
								Mauris blandit sollicitudin mattis. Fusce commodo arcu vitae risus consectetur sollicitudin. Aliquam eget posuere orci. Cras pellentesque lobortis sapien non lacinia.
							</div>
						</div>
					</Scroller>
				</div>
			</Panel>
		);
	}
});

export default MainPanel;
