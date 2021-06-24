import kind from '@enact/core/kind';
import Heading from '@enact/agate/Heading';
import Button from '@enact/agate/Button';
import Item from '@enact/agate/Item';
import Header from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';
import RadioItem from '@enact/agate/RadioItem';
import VirtualList from '@enact/agate/VirtualList';
import {SpotlightContainerDecorator} from '@enact/spotlight/SpotlightContainerDecorator';
import {Cell, Column, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';

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
			<Header subtitle={titleBelow} title={title}>
				{DebugButton}
			</Header>
			<Row style={{height: '100%'}}>
				<Cell size={360}>
					<RadioItem defaultSelected>Photo Items</RadioItem>
					<RadioItem>Video Items</RadioItem>
					<RadioItem>Audio Items</RadioItem>
				</Cell>
				<Cell>
					<Column>
						<Cell shrink>
							<Heading showLine>All Items</Heading>
						</Cell>
						<Cell>
							<VirtualList
								data={items}
								dataSize={items.length}
								itemRenderer={itemRenderer}
								itemSize={ri.scale(60)}
							/>
						</Cell>
					</Column>
				</Cell>
				<Cell component={SpottableContainer} shrink>
					<Column style={{justifyContent: 'center'}}>
						<Cell component={Button} icon="arrowlargeright" shrink />
						<Cell component={Button} icon="arrowlargeleft" shrink style={{marginTop: ri.unit(12, 'rem')}} />
					</Column>
				</Cell>
				<Cell>
					<Heading showLine>Selected Items</Heading>
					<Item>Item 1</Item>
					<Item>Item 2</Item>
				</Cell>
			</Row>
		</Panel>
	)
});

export default ItemPanel;
