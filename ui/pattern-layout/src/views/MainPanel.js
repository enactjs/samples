import kind from '@enact/core/kind';
import Heading from '@enact/ui/Heading';
import ImageItem from '@enact/ui/ImageItem';
import ri from '@enact/ui/resolution';
import {VirtualGridList} from '@enact/ui/VirtualList';
import PropTypes from 'prop-types';

import css from './MainPanel.module.less';

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
			<div {...rest} className={css.main}>
				<Heading className={css.heading} size="title">
					Example Layouts
					<div className={css.subtitle}>
						Choose a layout
					</div>
				</Heading>

				<VirtualGridList
					dataSize={items.length}
					itemRenderer={itemRenderer}
					itemSize={{minWidth: ri.scale(300), minHeight: ri.scale(270)}}
					spacing={ri.scale(24)}
				/>
			</div>
		);
	}
});

export default MainPanel;
