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
			height: ri.scale(360) + 'px'
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

		preserveFocusStatus: PropTypes.func,

		focusStatus: PropTypes.any
	}

	getFocusStatus = nop
	setFocusStatus = nop

	constructor(props) {
		super(props);
	}

	cbGetFocusStatus = (cbGetFocusStatus) => {
		this.getFocusStatus = cbGetFocusStatus;
	}

	cbSetFocusStatus = (cbSetFocusStatus) => {
		this.setFocusStatus = cbSetFocusStatus;
	}

	componentWillUnmount () {
		this.props.preserveFocusStatus(this.getFocusStatus());
	}

	componentDidMount () {
		if (this.props.focusStatus) {
			this.setFocusStatus(this.props.focusStatus);
		}
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
					cbGetFocusStatus={this.cbGetFocusStatus}
					cbSetFocusStatus={this.cbSetFocusStatus}
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
