import kind from '@enact/core/kind';
import {SpotlightContainerDecorator} from '@enact/spotlight/SpotlightContainerDecorator';
import Heading from '@enact/ui/Heading';
import Icon from '@enact/ui/Icon';
import Item from '@enact/ui/Item';
import {Cell, Column, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import VirtualList from '@enact/ui/VirtualList';
import PropTypes from 'prop-types';

const SpottableContainer = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

const items = Array(80).fill().map((_, i) => 'Item ' + (i + 1));
const itemStyle = {
	margin: '12px 0px',
	fontSize: '18px',
	cursor: 'default'
};

// eslint-disable-next-line enact/display-name, enact/prop-types
const renderItem = () => ({index, ...rest}) => (
	<Item {...rest} style={itemStyle}>
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

	render: ({title, titleBelow, itemRenderer, DebugButton, ...rest}) => {
		delete rest.spotlightId;
		delete rest.hideChildren;

		return (
			<div {...rest} style={{height: '100%'}}>
				<Heading size="title" style={{width: 'calc(100% - 2em)', borderBottom: '3px solid grey'}}>
					{title}
					<div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'normal', fontSize: '18px'}}>
						{titleBelow}
						{DebugButton}
					</div>
				</Heading>
				<Row style={{height: 'calc(100% - 10em)', width: 'calc(100% - 4em)'}} >
					<Cell size={300}>
						<Item style={itemStyle}>Photo Items</Item>
						<Item style={itemStyle}>Video Items</Item>
						<Item style={itemStyle}>Audio Items</Item>
					</Cell>
					<Cell>
						<Column>
							<Cell shrink>
								<Heading size="large" style={{borderBottom: '1px solid grey'}}>All Items</Heading>
							</Cell>
							<Cell>
								<VirtualList
									data={items}
									dataSize={items.length}
									itemRenderer={itemRenderer}
									itemSize={ri.scale(48)}
								/>
							</Cell>
						</Column>
					</Cell>
					<Cell component={SpottableContainer} shrink>
						<Column style={{justifyContent: 'center'}}>
							<Cell shrink>
								<Icon style={{fontSize: '36px'}}>{'&#x2190;'}</Icon>
							</Cell>
							<Cell shrink style={{marginTop: ri.unit(12, 'rem'), textAlign: 'center'}}>
								<Icon style={{fontSize: '36px'}}>{'&#128465;'}</Icon>
							</Cell>
						</Column>
					</Cell>
					<Cell>
						<Heading size="large" style={{borderBottom: '1px solid grey'}}>Selected Items</Heading>
						<Item style={itemStyle}>Item 1</Item>
						<Item style={itemStyle}>Item 2</Item>
					</Cell>
				</Row>
			</div>
		);
	}
});

export default ItemPanel;
