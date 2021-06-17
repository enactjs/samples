import kind from '@enact/core/kind';
import {SpotlightContainerDecorator} from '@enact/spotlight/SpotlightContainerDecorator';
import Heading from '@enact/ui/Heading';
import Icon from '@enact/ui/Icon';
import Item from '@enact/ui/Item';
import {Cell, Column, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import VirtualList from '@enact/ui/VirtualList';
import PropTypes from 'prop-types';

import css from './FavoritesList.module.less';

const SpottableContainer = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

const items = Array(80).fill().map((_, i) => 'Item ' + (i + 1));
const itemStyle = {
	margin: '12px 0',
	fontSize: '24px',
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
				<Heading className={css.heading} size="title">
					{title}
					<div className={css.subtitle}>
						{titleBelow}
						{DebugButton}
					</div>
				</Heading>
				<Row className={css.row}>
					<Cell size={300}>
						<Item style={itemStyle}>Photo Items</Item>
						<Item style={itemStyle}>Video Items</Item>
						<Item style={itemStyle}>Audio Items</Item>
					</Cell>
					<Cell>
						<Column>
							<Cell shrink>
								<Heading className={css.cellHeading} size="large">All Items</Heading>
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
						<Column className={css.column}>
							<Cell shrink>
								<Icon className={css.icon}>{'&#x2190;'}</Icon>
							</Cell>
							<Cell shrink style={{marginTop: ri.unit(12, 'rem'), textAlign: 'center'}}>
								<Icon className={css.icon}>{'&#128465;'}</Icon>
							</Cell>
						</Column>
					</Cell>
					<Cell>
						<Heading className={css.cellHeading} size="large">Selected Items</Heading>
						<Item style={itemStyle}>Item 1</Item>
						<Item style={itemStyle}>Item 2</Item>
					</Cell>
				</Row>
			</div>
		);
	}
});

export default ItemPanel;
