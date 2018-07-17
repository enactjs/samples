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
		title: PropTypes.string,
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
		const {list, title} = this.props;

		return [
			<Cell key="header" shrink><Divider>{title}</Divider></Cell>,
			<Cell
				component={VirtualList}
				key="list"
				dataSize={list.length}
				focusableScrollbar={null}
				itemRenderer={this.renderItem}
				itemSize={scale(60)}
				size={list.length <= 4 ? (60 * list.length) : null}
				spacing={0}
			/>];
	}
}

export default List;
