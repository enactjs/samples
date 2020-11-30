import Item from '@enact/sandstone/Item';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import VirtualList from '@enact/sandstone/VirtualList';

import css from './PatternList.module.less';

const items = Array.from(new Array(1000)).map((n, i) => `Item  ${('00' + i).slice(-3)}`);

class PatternList extends Component {
	static propTypes = {
		id: PropTypes.string,
		onClick: PropTypes.func
	}

	renderItem = ({index, ...rest}) => (
		<Item {...rest} onClick={this.props.onClick} style={{margin: 0}}>
			{items[index]}
		</Item>
	)

	render () {
		const {id, ...rest} = this.props;
		delete rest.onClick;

		return (
			<VirtualList
				{...rest}
				className={css.list}
				dataSize={items.length}
				id={id}
				itemRenderer={this.renderItem}
				itemSize={ri.scale(156)}
				spotlightId={id}
			/>
		);
	}

}

export default PatternList;
export {PatternList};
