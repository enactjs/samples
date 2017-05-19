import {connect} from 'react-redux';
import Item from '@enact/moonstone/Item';
import React, {Component, PropTypes} from 'react';
import ri from '@enact/ui/resolution';
import {VirtualList} from '@enact/moonstone/VirtualList';

import {saveLastScrollInfo} from '../actions';

const items = [];

for (let i = 0; i < 50; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

class PatternListBase extends Component {
	static propTypes = {
		lastScrollInfo: PropTypes.shape({
			lastScrollLeft: PropTypes.number,
			lastScrollTop:  PropTypes.number
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
		//const {lastScrollLeft, lastScrollTop} = this.props.lastScrollInfo;
		//this.scrollTo({position: {x: lastScrollLeft, y: lastScrollTop}, animate: false});
		//this.scrollTo({index: 15, focus: true, animate: false});
		//setTimeout(() => {
		//	this.scrollTo({index: 12, focus: true, animate: false});
		//}, 0);
	}

	render = () => {
		const
			{onWillUnmount, ...rest} = this.props,
			{lastScrollTop} = this.props.lastScrollInfo;;
		delete rest.lastScrollInfo;

		return (
			<VirtualList
				cbScrollTo={this.getScrollTo}
				component={this.renderItem}
				data={items}
				dataSize={items.length}
				itemSize={ri.scale(72)}
				style={{height: ri.scale(360)}}
				clientSize={{clientWidth: 1896, clientHeight: 360}}
			/>
		);
	}

}

/*const mapStateToProps = ({lastScrollInfo}, {index}) => ({
	lastScrollInfo: lastScrollInfo[index]
});

const mapDispatchToProps = (dispatch, {index}) => ({
	onWillUnmount: (info) => dispatch(saveLastScrollInfo(index, info))
});

const PatternList = connect(mapStateToProps, mapDispatchToProps)(PatternListBase);
*/
export default PatternListBase;
export {PatternListBase as PatternList};
