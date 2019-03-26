import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import {Cell, Column, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {SpotlightContainerDecorator} from '@enact/spotlight/SpotlightContainerDecorator';
import Divider from '@enact/moonstone/Divider';
import IconButton from '@enact/moonstone/IconButton';
import Item from '@enact/moonstone/Item';
import {Panel, Header} from '@enact/moonstone/Panels';
import SelectableItem from '@enact/moonstone/SelectableItem';
import VirtualList from '@enact/moonstone/VirtualList';

const SpottableContainer = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

const items = Array(80).fill().map((_, i) => 'Item ' + (i + 1));

// eslint-disable-next-line enact/display-name, enact/prop-types
const renderItem = () => ({index, ...rest}) => (
	<Item {...rest}>
		{items[index]}
	</Item>
);

const ItemPanel = kind({
	name: 'ItemPanel',

	propTypes: {
		DebugButton: PropTypes.object,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string,
		titleBelow: PropTypes.string
	},

	computed: {
		itemRenderer: renderItem
	},

	render: ({title, titleBelow, itemRenderer, DebugButton, ...rest}) => (
		<Panel {...rest}>
			<Header title={title} titleBelow={titleBelow}>
				{DebugButton}
			</Header>
			<Row style={{height: '100%'}}>
				<Cell size={300}>
					<SelectableItem selected>Photo Items</SelectableItem>
					<SelectableItem>Video Items</SelectableItem>
					<SelectableItem>Audio Items</SelectableItem>
				</Cell>
				<Cell>
					<Column>
						<Cell shrink>
							<Divider>All Items</Divider>
						</Cell>
						<Cell>
							<VirtualList
								itemRenderer={itemRenderer}
								data={items}
								dataSize={items.length}
								itemSize={ri.scale(60)}
							/>
						</Cell>
					</Column>
				</Cell>
				<Cell shrink component={SpottableContainer}>
					<Column style={{justifyContent: 'center'}}>
						<Cell component={IconButton} shrink>arrowlargeright</Cell>
						<Cell component={IconButton} shrink style={{marginTop: ri.unit(12, 'rem')}}>trash</Cell>
					</Column>
				</Cell>
				<Cell>
					<Divider>Selected Items</Divider>
					<Item>Item 1</Item>
					<Item>Item 2</Item>
				</Cell>
			</Row>
		</Panel>
	)
});

export default ItemPanel;
