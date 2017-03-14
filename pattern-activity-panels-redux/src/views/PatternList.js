import {connect} from 'react-redux';
import Item from '@enact/moonstone/Item';
import React, {Component, PropTypes} from 'react';
import ri from '@enact/ui/resolution';
import {VirtualList} from '@enact/moonstone/VirtualList';

import {saveLastScrollInfo} from '../actions';
import css from './PatternList.less';

const items = [];

for (let i = 0; i < 1000; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

class PatternListBase extends Component {
	static propTypes = {
		lastScrollInfo: PropTypes.shape({
			lastScrollLeft: PropTypes.number,
			lastScrollTop:  PropTypes.number,
			lastFocusedIndex: PropTypes.number
		}),
		onClick: PropTypes.func,
		onWillUnmount: PropTypes.func
	}

	static defaultProps = {
		lastScrollInfo: {
			lastScrollLeft: 0,
			lastScrollTop: 0,
			lastFocusedIndex: 0
		}
	}

	renderItem = ({data, index, ...rest}) => (
		<Item {...rest} onClick={this.props.onClick}>
			{data[index]}
		</Item>
	)

	getScrollTo = (fn) => {
		this.scrollTo = fn;
	}

	componentDidMount () {
		const {lastScrollLeft, lastScrollTop, lastFocusedIndex} = this.props.lastScrollInfo;
		this.scrollTo({position: {x: lastScrollLeft, y: lastScrollTop}, indexToFocus: lastFocusedIndex, animate: false});
	}

	render = () => {
		const {onWillUnmount, ...rest} = this.props;
		delete rest.lastScrollInfo;

		return (
			<VirtualList
				cbScrollTo={this.getScrollTo}
				component={this.renderItem}
				data={items}
				dataSize={items.length}
				itemSize={ri.scale(72)}
				onWillUnmount={onWillUnmount}
				className={css.list}
			/>
		);
	}

}

const mapStateToProps = ({lastScrollInfo}, {index}) => ({
	lastScrollInfo: lastScrollInfo[index]
});

const mapDispatchToProps = (dispatch, {index}) => ({
	onWillUnmount: (info) => dispatch(saveLastScrollInfo(index, info))
});

const PatternList = connect(mapStateToProps, mapDispatchToProps)(PatternListBase);

export default PatternList;
export {PatternList};
