import kind from '@enact/core/kind';
import Heading from '@enact/ui/Heading';
import ImageItem from '@enact/ui/ImageItem';
import ri from '@enact/ui/resolution';
import {VirtualGridList} from '@enact/ui/VirtualList';
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
				>{items[index].title}</ImageItem>
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
		delete rest.spotlightId;
		delete rest.hideChildren;

		return (
			<div style={{margin: '24px 18px'}} {...rest}>
				<Heading size="title" style={{borderBottom: '3px solid grey'}}>
					Example Layouts
					<div style={{fontWeight: 'normal', fontSize: '18px'}}>
						Choose a layout
					</div>
				</Heading>

				<VirtualGridList
					dataSize={items.length}
					itemRenderer={itemRenderer}
					itemSize={{minWidth: ri.scale(300), minHeight: ri.scale(270)}}
					spacing={ri.scale(18)}
					style={{
						height: '100%'
					}}
				/>
			</div>
		);
	}
});

export default MainPanel;
