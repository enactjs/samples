import {connect} from 'react-redux';
import Item from '@enact/moonstone/Item';
import React, {Component, PropTypes} from 'react';
import ri from '@enact/ui/resolution';
import {VirtualList} from '@enact/moonstone/VirtualList';

import {saveLastScrollInfo} from '../actions';

const
	listStyle = {
		height: ri.scale(360) + 'px'
	},
	items = [];

for (let i = 0; i < 1000; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

class PatternListBase extends Component {
	static propTypes = {
		onClick: PropTypes.func,
		onWillUnmount: PropTypes.func,
		lastScrollInfo: PropTypes.shape({
			lastScrollLeft: PropTypes.number,
			lastScrollTop:  PropTypes.number,
			lastFocusedIndex: PropTypes.number
		})
	}

	static defaultProps = {
		lastScrollInfo: {
			lastScrollLeft: 0,
			lastScrollTop: 0,
			lastFocusedIndex: 0
		}
	}

	renderItem = (onClick) => (props) => {
		const {data, index, ...rest} = props;
		return (
			<Item {...rest} onClick={onClick}>
				{data[index]}
			</Item>
		);
	}

	getScrollTo = (fn) => {
		this.scrollTo = fn;
	}

	componentDidMount () {
		const {lastScrollLeft, lastScrollTop, lastFocusedIndex} = this.props.lastScrollInfo;
		this.scrollTo({position: {x: lastScrollLeft, y: lastScrollTop}, indexToFocus: lastFocusedIndex, animate: false});
	}

	render = () => {
		const {onWillUnmount, onClick, index, ...rest} = this.props;
		delete rest.lastScrollInfo;

		return (
			<VirtualList
				cbScrollTo={this.getScrollTo}
				component={this.renderItem(onClick)}
				data={items}
				dataSize={items.length}
				itemSize={ri.scale(72)}
				onWillUnmount={onWillUnmount(index)}
				style={listStyle}
			/>
		);
	}

}

const mapStateToProps = ({lastScrollInfo, index}) => ({
	lastScrollInfo: lastScrollInfo[index]
});

const mapDispatchToProps = (dispatch) => {
	return {
		onWillUnmount: (index) => (info) => dispatch(saveLastScrollInfo(index, info))
	};
};

const PatternList = connect(mapStateToProps, mapDispatchToProps)(PatternListBase);

export default PatternList;
export {PatternList};
