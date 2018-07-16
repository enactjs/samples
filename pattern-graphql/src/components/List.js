import {Cell} from '@enact/ui/Layout';
import Divider from '@enact/moonstone/Divider';
import Item from '@enact/moonstone/Item';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {scale} from '@enact/ui/resolution';
import VirtualList from '@enact/moonstone/VirtualList';

class List extends Component {
	static propTypes = {
		list: PropTypes.arrayOf(PropTypes.object).isRequired,
		userId: PropTypes.string
	}

	renderItem = ({index, ...rest}) => (
		<Item
			{...rest}
			index={index}
		>
			{this.props.list[index].name}
		</Item>
	);

	render = () => {
		const list = this.props.list;

		return [
			<Cell key="header" shrink><Divider>Repositories</Divider></Cell>,
			<Cell
				component={VirtualList} size={list.length <= 4 ? (60 * list.length) : null}
				key="list"
				dataSize={list.length}
				focusableScrollbar={null}
				itemRenderer={this.renderItem}
				itemSize={scale(60)}
				spacing={0}
			/>];
	}
}

export default List;
