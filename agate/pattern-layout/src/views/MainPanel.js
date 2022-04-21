import kind from '@enact/core/kind';
import ImageItem from '@enact/agate/ImageItem';
import Header from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';
import {VirtualGridList} from '@enact/agate/VirtualList';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';

const GridItem = kind({
	name: 'GridItem',
	propTypes: {
		index: PropTypes.number,
		items: PropTypes.array,
		onSelect: PropTypes.func
	},
	handlers: {
		onSelect: (ev, {index, onSelect}) => onSelect({index})
	},
	render: ({index, items, onSelect, ...rest}) => {
		if (items && items[index]) {
			return (
				<ImageItem
					{...rest}
					onClick={onSelect}
					src={items[index].image}
				>
					{items[index].title}
				</ImageItem>
			);
		}
	}
});

// eslint-disable-next-line enact/display-name, enact/prop-types
const renderItem = ({items, onChangePanel}) => ({index, ...rest}) => {
	if (items && items[index]) {
		return (
			<GridItem
				{...rest}
				index={index}
				items={items}
				onSelect={onChangePanel}
			/>
		);
	}
};

const MainPanel = kind({
	name: 'MainPanel',

	propTypes: {
		/**
		 * A collection of all of the items to be rendered by this VirtualGridList
		 * @type {Array}
		 */
		items: PropTypes.array,

		/**
		 * A function to run when the panel changes
		 * @type {Function}
		 */
		onChangePanel: PropTypes.func
	},

	computed: {
		itemRenderer: renderItem
	},

	render: ({items, itemRenderer, ...rest}) => {
		delete rest.onChangePanel;
		return (
			<Panel {...rest}>
				<Header type="compact">
					<title>Example Layouts</title>
					<subtitle>Choose a layout</subtitle>
				</Header>

				<VirtualGridList
					dataSize={items.length}
					focusableScrollbar
					itemRenderer={itemRenderer}
					itemSize={{minWidth: ri.scale(300), minHeight: ri.scale(270)}}
					spacing={ri.scale(18)}
					style={{
						height: '100%'
					}}
				/>
			</Panel>
		);
	}
});

export default MainPanel;
