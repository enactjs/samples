import {$L} from '@enact/i18n';
import Button from '@enact/moonstone/Button';
import Changeable from '@enact/ui/Changeable';
import classNames from 'classnames';
import {createStore} from 'redux';
import Icon from '@enact/moonstone/Icon';
import IconButton from '@enact/moonstone/IconButton';
import {ItemBase} from '@enact/moonstone/Item';
import kind from '@enact/core/kind';
import LazyDecorator from '@enact/moonstone/LazyDecorator';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React, {Component, PropTypes} from 'react';
import Repeater from '@enact/ui/Repeater';
import Resizable from '@enact/ui/Resizable';
import ri from '@enact/ui/resolution';
import Scroller from '@enact/moonstone/Scroller';
import {Spottable} from '@enact/spotlight';

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

	render: ({children, contentText, contentTextClassName, 'data-index': index, messageClassName, moreLessIcon, moreLessText, onClick, onDelete}) => {
		const {action, iconType, more, received} = children;

		return (
			<div className={messageClassName} data-index={index} key={index}>
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
const ExpandableMessage = Resizable(
	{resize: 'onOpen'},
	Changeable({prop: 'open', change: 'onOpen'}, Message)
);
const LazyRepeater = LazyDecorator(Repeater);

const iconData = ['gear', 'star', 'lock', 'plug', 'flag'];
const shortText = $L('Welcome to your new LG webOS TV! We appreciate you choosing LG and have designed your new TV to make enjoying an unparalleled entertainment experience as simple as possible.<br><br>- Simple Switching: Easily switch between channels, input sources and apps all from your customizable Home screen.<br>- Simple Connections: It’s never been easier to set up your TV and connect all the devices you use to watch your favorite shows and movies, play games, listen to music and more.<br>- Simple Discovery: Find programming from all your live and streaming sources that match your taste and interests.<br><br>Visit the LG store to find a wide selection of apps, games, VODs and more. You can also find content by using your TV’s built-in search and recommendation functions.');
const longText = $L('Welcome to your new LG webOS UHD Broadcast Box! We appreciate you choosing LG and have designed your new UHD Broadcast Box to make enjoying an unparalleled entertainment experience as simple as possible.<br><br>- Simple Switching: Easily switch between channels, input sources and apps all from your customizable Home screen.<br>- Simple Connections: It’s never been easier to set up your UHD Broadcast Box and connect all the devices you use to watch your favorite shows and movies, play games, listen to music and more.<br>- Simple Discovery: Find programming from all your live and streaming sources that match your taste and interests.<br><br>Visit the LG store to find a wide selection of apps, games, VODs and more. You can also find content by using your UHD Broadcast Box’s built-in search and recommendation functions.');
const receivedData = ['3/1, 11:27 PM', '6/3, 04:21 AM', '1/1, 01:01 PM', '12/11, 11:11 AM', '3/31, 11:59 PM'];
const items = [];
const getNewItem = (index) => {
	const isShortMessage = !!(Math.round(Math.random()));

	return {
		action: !!(Math.round(Math.random())),
		iconType: iconData[parseInt(Math.random() * 5)],
		message: isShortMessage ? (`[${index}] ${shortText}`) : (`[${index}] ${longText}`),
		more: !isShortMessage,
		moreOpen: false,
		height: (isShortMessage ? ri.scale(115) : ri.scale(142)),
		received: receivedData[parseInt(Math.random() * 5)]
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

		return (
			<div {...this.props}>
				<Scroller horizontal="hidden" className={css.scroller}>
					<LazyRepeater
						childComponent={ExpandableMessage}
						className={css.lazyList}
						itemProps={{
							onDelete: this.deleteItem
						}}
					>
						{data}
					</LazyRepeater>
				</Scroller>
				<Button onClick={this.addItem} className={css.button}>Add</Button>
			</div>
		);
	}
}

export default MoonstoneDecorator(NotificationCenterSample);
