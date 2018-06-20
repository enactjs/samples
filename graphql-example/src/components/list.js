import VirtualList from '@enact/moonstone/VirtualList';
import Item from '@enact/moonstone/Item';
import Divider from '@enact/moonstone/Divider';
import {Cell} from '@enact/ui/Layout';
import {scale} from '@enact/ui/resolution';
import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

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

const ListBase = kind({
	name: 'Detail',

	propTypes: {
		list: PropTypes.object,
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

export default ListBase;
export {ListBase as List, ListBase};
