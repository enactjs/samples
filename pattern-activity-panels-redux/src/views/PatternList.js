import {connect} from 'react-redux';
import Item from '@enact/moonstone/Item';
import React, {Component} from 'react';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {VirtualList} from '@enact/moonstone/VirtualList';

import {saveLastScrollInfo} from '../actions';
import css from './PatternList.less';

const items = [];

for (let i = 0; i < 1000; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

class PatternListBase extends Component {
	static propTypes = {
		id: PropTypes.string,
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
			lastScrollTop: 0
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
		const {lastScrollLeft, lastScrollTop} = this.props.lastScrollInfo;
		this.scrollTo({position: {x: lastScrollLeft, y: lastScrollTop}, animate: false});
	}

	render = () => {
		const {onWillUnmount, id, ...rest} = this.props;
		delete rest.lastScrollInfo;

		return (
			<VirtualList
				cbScrollTo={this.getScrollTo}
				className={css.list}
				component={this.renderItem}
				containerId={id}
				data={items}
				dataSize={items.length}
				itemSize={ri.scale(72)}
				onWillUnmount={onWillUnmount}
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
