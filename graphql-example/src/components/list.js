import {Cell} from '@enact/ui/Layout';
import Divider from '@enact/moonstone/Divider';
import kind from '@enact/core/kind';
import Item from '@enact/moonstone/Item';
import PropTypes from 'prop-types';
import React from 'react';
import {scale} from '@enact/ui/resolution';
import VirtualList from '@enact/moonstone/VirtualList';

// eslint-disable-next-line enact/display-name, enact/prop-types
const renderItem = ({list}) => ({index, ...rest}) => {
	return (
		<Item
			{...rest}
			index={index}
		>
			{list[index].name}
		</Item>
	);
};

const List = kind({
	name: 'Detail',

	propTypes: {
		list: PropTypes.arrayOf(PropTypes.object),
		userId: PropTypes.string
	},

	computed: {
		itemRenderer: renderItem
	},

	render: ({itemRenderer, list}) => {
		return [
			<Cell key="header" shrink><Divider>Repositories</Divider></Cell>,
			<Cell
				component={VirtualList} size={list.length <= 4 ? (60 * list.length) : null}
				key="list"
				dataSize={list.length}
				focusableScrollbar={null}
				itemRenderer={itemRenderer}
				itemSize={scale(60)}
				spacing={0}
			/>];
	}
});

export default List;
