import Button from '@enact/moonstone/Button';
import {Header, Panel} from '@enact/moonstone/Panels';
import Item from '@enact/moonstone/Item';
import React, {Component, PropTypes} from 'react';
import ri from '@enact/ui/resolution';
import VirtualList from '@enact/moonstone/VirtualList';

const child = 'Click me';

const
	style = {
		item: {
			position: 'absolute',
			width: '100%',
			height: ri.scale(72) + 'px',
			borderBottom: ri.scale(2) + 'px solid #202328',
			boxSizing: 'border-box',

			color: 'white',
			fontSize: ri.scale(40) + 'px',
			lineHeight: ri.scale(70) + 'px'
		},
		listHeight: {
			height: ri.scale(200) + 'px'
		}
	},
	items = [],
	nop = () => {};

for (let i = 0; i < 1000; i++) {
	items.push('Item ' + ('00' + i).slice(-3));
}

class MainPanel extends Component {
	static propTypes = {
		/**
		 * A function to run on click event
		 * @type {Function}
		 */
		onClick: PropTypes.func,

		/**
		 * A title string appear on header
		 * @type {String}
		 */
		title: PropTypes.string,

		syncListPositionY: PropTypes.func,

		listPositionY: PropTypes.number
	}

	getFocusedItemPosition = nop
	scrollTo = nop

	constructor(props) {
		super(props);
	}

	getScrollTo = (scrollTo) => {
		this.scrollTo = scrollTo;
	}

	setScrollTo = () => {
		this.scrollTo({position: {y: this.props.listPositionY}, animate: false});
	}

	cbGetFocusedItemPosition = (cbGetFocusedItemPosition) => {
		this.getFocusedItemPosition = cbGetFocusedItemPosition;
	}

	componentDidMount () {
		if (this.props.listPositionY) {
			this.setScrollTo();
		}
	}

	componentWillUnmount () {
		this.props.syncListPositionY(this.getFocusedItemPosition().top);
	}

	renderItem = (onClick) => (props) => {
		const {data, index, key} = props;
		return (
			<Item key={key} style={style.item} onClick={onClick}>
				{data[index]}
			</Item>
		);
	}

	render = () => {
		const {title, onClick} = this.props;

		return (
			<Panel>
				<Header title={title}>
					<Button onClick={onClick}>{child}</Button>
					<Button onClick={onClick}>{child}</Button>
				</Header>
				<VirtualList
					cbGetFocusedItemPosition={this.cbGetFocusedItemPosition}
					cbScrollTo={this.getScrollTo}
					component={this.renderItem(onClick)}
					data={items}
					dataSize={items.length}
					direction='vertical'
					itemSize={72}
					spacing={0}
					style={style.listHeight}
				/>
			</Panel>
		);
	}
};

export default MainPanel;
