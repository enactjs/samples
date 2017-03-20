import {$L} from '@enact/i18n';
import Button from '@enact/moonstone/Button';
import Changeable from '@enact/ui/Changeable';
import classNames from 'classnames';
import {createStore} from 'redux';
import Icon from '@enact/moonstone/Icon';
import IconButton from '@enact/moonstone/IconButton';
import {ItemBase} from '@enact/moonstone/Item';
import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React, {Component, PropTypes} from 'react';
import Repeater from '@enact/ui/Repeater';
import LazyChildDecorator from '@enact/moonstone/LazyChildDecorator';
import ri from '@enact/ui/resolution';
import Scroller from '@enact/moonstone/Scroller';
import {Spottable} from '@enact/spotlight';
import VirtualList from '@enact/moonstone/VirtualList';

import css from './App.less';

const SpottableItem = Spottable(ItemBase);
const MoreLessButton = kind({
	name: 'MoreLessButton',

	propTypes: {
		/**
		 * The icon for more or less icon button.
		 *
		 * @type {String}
		 * @public
		 */
		moreLessIcon: PropTypes.string,

		/**
		 * The text for more or less icon button.
		 *
		 * @type {String}
		 * @public
		 */
		moreLessText: PropTypes.string,

		/**
		 * The handler for more or less icon button.
		 *
		 * @type {Function}
		 * @public
		 */
		onClick: PropTypes.func
	},

	render: ({moreLessIcon, moreLessText, onClick}) => (
		<SpottableItem onClick={onClick}>
			{moreLessText}
			<Icon>{moreLessIcon}</Icon>
		</SpottableItem>
	)
});
const Message = kind({
	name: 'Message',

	propTypes: {
		/**
		 * The index of the children.
		 *
		 * @type {Booelean}
		 * @public
		 */
		'data-index': PropTypes.number,

		/**
		 * The callback funtion to update `open` prop.
		 *
		 * @type {Booelean}
		 * @public
		 */
		onOpen: PropTypes.func,

		/**
		 * Whether opened or closed.
		 *
		 * @type {Booelean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool
	},

	defaultProps: {
		open: false
	},

	styles: {
		css,
		className: 'message'
	},

	computed: {
		messageClassName: ({children, className, open}) => classNames(
			className,
			children.more ? css.messageMore : null,
			open ? css.messageExpand : null
		),
		contentTextClassName: ({children, open}) => classNames(
			css.contentText,
			children.more ? css.more : null,
			open ? css.expand : null
		),
		contentText: ({children}) => children.message,
		moreLessText: ({open}) => (open ? 'less' : 'more'),
		moreLessIcon: ({open}) => (open ? 'arrowsmallup' : 'arrowsmalldown'),
		onClick: ({onOpen, open}) => () => {
			onOpen({open: !open});
		},
		onDelete: ({onDelete}) => (index) => () => onDelete(index)
	},

	render: ({children, contentText, contentTextClassName, 'data-index': index, messageClassName, moreLessIcon, moreLessText, onClick, onDelete, style}) => {
		const {action, iconType, more, received} = children;

		return (
			<div className={messageClassName} data-index={index} key={index} style={style}>
				<Icon small={false}>{iconType}</Icon>
				<div>{received}</div>
				<div>
					<img draggable={'false'} />
					<div className={contentTextClassName}>{contentText}</div>
				</div>
				<div>{more ? <MoreLessButton moreLessIcon={moreLessIcon} moreLessText={moreLessText} onClick={onClick} /> : null}</div>
				<div>
					{action ? <IconButton small>arrowlargeright</IconButton> : null}
					<IconButton small onClick={onDelete(index)}>closex</IconButton>
				</div>
			</div>
		);
	}
});
const ExpandableMessage = LazyChildDecorator(
	{resize: 'onOpen'},
	Changeable({prop: 'open', change: 'onOpen'}, Message)
);
// const LazyRepeater = LazyChildrenDecorator(Repeater);

const longText = $L('Welcome to your new LG webOS UHD Broadcast Box! We appreciate you choosing LG and have designed your new UHD Broadcast Box to make enjoying an unparalleled entertainment experience as simple as possible.<br><br>- Simple Switching: Easily switch between channels, input sources and apps all from your customizable Home screen.<br>- Simple Connections: It’s never been easier to set up your UHD Broadcast Box and connect all the devices you use to watch your favorite shows and movies, play games, listen to music and more.<br>- Simple Discovery: Find programming from all your live and streaming sources that match your taste and interests.<br><br>Visit the LG store to find a wide selection of apps, games, VODs and more. You can also find content by using your UHD Broadcast Box’s built-in search and recommendation functions.');
const items = [];
const getNewItem = (index) => {
	return {
		action: true,
		iconType: 'gear',
		message: (`[${index}] ${longText}`),
		more: true,
		moreOpen: false,
		height: ri.scale(142),
		received: '3/1, 11:27 PM'
	};
};
for (let i = 0; i < 50; i++) {
	items[i] = getNewItem(i);
}

const types = {
	ADD_ITEM   : 'ADD_ITEM',
	DELETE_ITEM: 'DELETE_ITEM'
};
const reducer = (state = items, action) => {
	switch (action.type) {
		case types.ADD_ITEM:
			return [action.child, ...state];
		case types.DELETE_ITEM:
			if (0 <= action.index && action.index < state.length) {
				return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
			} else {
				return state;
			}
		default:
			return state;
	}
};
const addItem    = (child)  => ({type: types.ADD_ITEM, child});
const deleteItem = (index) => ({type: types.DELETE_ITEM, index});

const renderItem = ({data, index, ...rest}) => {
	return (
		<ExpandableMessage {...rest} data-index={index}>
			{data[index]}
		</ExpandableMessage>
	);
};

const renderSimpleDivItem = ({children, data, index, ...rest}) => {
	let child = children || data;

	child = child[index] || child;

	return (
		<div {...rest} className={css.simpleDiv} data-index={index} key={index}>
			{child.received}
		</div>
	);
};

// const testCase = 0; // Scroller + LazyChildrenDecorator + Repeater + 50 ExpandableMessage
// const testCase = 1; // Scroller + Repeater + 50 ExpandableMessage
// const testCase = 2; // VirtualList + 50 ExpandableMessage
// const testCase = 3; // Repeater + 50 ExpandableMessage
// const testCase = 4; // Array.map + 50 ExpandableMessage
// const testCase = 5; // 1 ExpandableMessage

// const testCase = 10; // Scroller + LazyChildrenDecorator + Repeater + 50 div
// const testCase = 11; // Scroller + Repeater + 50 div
// const testCase = 12; // VirtualList + 50 div
// const testCase = 13; // Repeater + 50 div
// const testCase = 14; // Array.map + 50 div
// const testCase = 15; // 1 div

const testCase = 1; // null

class NotificationCenterSample extends Component {
	constructor (props) {
		super(props);

		this.store = createStore(reducer);
		this.state = {
			data: this.store.getState()
		};
		this.unsubscribe = this.store.subscribe(this.updateData);
		this.newCount = 0;
	}

	componentWillUnmount = () => this.unsubscribe()

	updateData = () => this.setState({data: this.store.getState()})

	addItem = () => this.store.dispatch(addItem(getNewItem('NEW ' + this.newCount++)))

	deleteItem = (index) => this.store.dispatch(deleteItem(index))

	render () {
		const data = this.state.data;

		const children = (
			(testCase === 1) ?
				<Scroller horizontal="hidden" className={css.scroller}>
					<Repeater
						childComponent={ExpandableMessage}
						itemProps={{
							onDelete: this.deleteItem
						}}
					>
						{data}
					</Repeater>
				</Scroller>
			: (testCase === 2) ?
				<VirtualList
					component={renderItem}
					data={data}
					dataSize={data.length}
					itemSize={ri.scale(142)}
					className={css.scroller}
				/>
			: (testCase === 3) ?
				<Repeater
					childComponent={ExpandableMessage}
					className={css.scroller}
					itemProps={{
						onDelete: this.deleteItem
					}}
				>
					{data}
				</Repeater>
			: (testCase === 4) ?
				<div className={css.scroller}>
					{data.map((value, index, data) => renderItem({data, index}))}
				</div>
			: (testCase === 5) ?
				<div className={css.scroller}>
					{renderItem({data, index: 0})}
				</div>
			: (testCase === 11) ?
				<Scroller horizontal="hidden" className={css.scroller}>
					<Repeater
						childComponent={renderSimpleDivItem}
						itemProps={{
							onDelete: this.deleteItem
						}}
					>
						{data}
					</Repeater>
				</Scroller>
			: (testCase === 12) ?
				<VirtualList
					component={renderSimpleDivItem}
					data={data}
					dataSize={data.length}
					itemSize={ri.scale(142)}
					className={css.scroller}
				/>
			: (testCase === 13) ?
				<Repeater
					childComponent={renderSimpleDivItem}
					className={css.scroller}
					itemProps={{
						onDelete: this.deleteItem
					}}
				>
					{data}
				</Repeater>
			: (testCase === 14) ?
				<div className={css.scroller}>
					{data.map((value, index, data) => renderSimpleDivItem({children: data, index}))}
				</div>
			: (testCase === 15) ?
				<div className={css.scroller}>
					{renderSimpleDivItem({children: data, index: 0})}
				</div>
			: (testCase === 99) ?
				null
			: ''
		);

		return (
			<div {...this.props}>
				{children}
				<Button onClick={this.addItem} className={css.button}>Add</Button>
			</div>
		);
	}
}

export default MoonstoneDecorator(NotificationCenterSample);
