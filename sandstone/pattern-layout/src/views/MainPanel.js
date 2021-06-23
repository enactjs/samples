import kind from '@enact/core/kind';
import ImageItem from '@enact/sandstone/ImageItem';
import {Header, Panel} from '@enact/sandstone/Panels';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
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
					src={items[index].image.default}
					label={items[index].subTitle}
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
				<Header>
					<title>Example Layouts</title>
					<subtitle>Choose a layout</subtitle>
				</Header>

				<VirtualGridList
					dataSize={items.length}
					focusableScrollbar
					itemRenderer={itemRenderer}
					itemSize={{minWidth: ri.scale(600), minHeight: ri.scale(540)}}
					spacing={ri.scale(36)}
					style={{
						height: '100%'
					}}
				/>
			</Panel>
		);
	}
});

export default MainPanel;
