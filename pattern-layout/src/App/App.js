import React from 'react';
import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import {adaptEvent, forward, handle} from '@enact/core/handle';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import Button from '@enact/moonstone/Button';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels} from '@enact/moonstone/Panels';

import FavoritesList from '../views/FavoritesList';
import Details from '../views/Details';
import MainPanel from '../views/MainPanel';

import detailsThumb from '../views/thumbs/details.png';
import favoritesThumb from '../views/thumbs/favorites-list.png';

const items = [];

const itemPusher = (title, subTitle, component, image) => {
	items.push({
		title,
		subTitle,
		component,
		image
	});
};

// Add all of our Layout Patterns
itemPusher('Favorites List', 'Two list columns with focusable buttons in the center', FavoritesList, favoritesThumb);
itemPusher('Details View', 'Show off details about an item', Details, detailsThumb);

const Placeholder = kind({name: 'Placeholder'});

const App = kind({
	name: 'LayoutApp',

	propTypes: {
		debug: PropTypes.bool,
		itemIndex: PropTypes.number,
		onChangePanel: PropTypes.func,
		onToggleDebug: PropTypes.func
	},

	computed: {
		DebugButton: ({onToggleDebug, debug}) => (<Button onClick={onToggleDebug} selected={debug} small>Layout Borders</Button>)
	},

	handlers: {
		onSelectBreadcrumb: handle(
			adaptEvent((ev, props) => ({index: (props.index - 1), itemIndex: null}), forward('onChangePanel')),
			forward('onSelectBreadcrumb')
		),
		onChangePanel: handle(
			adaptEvent(({index}) => ({index: 1, itemIndex: index}), forward('onChangePanel'))
		)
	},

	render: ({debug, DebugButton, itemIndex, onChangePanel, ...rest}) => {
		delete rest.onToggleDebug;

		let secondaryPanel = <Placeholder />;
		const item = items[itemIndex];
		if (item) {
			const ItemPanel = item.component;
			secondaryPanel = (
				<ItemPanel
					className={debug ? 'debug layout' : ''}
					DebugButton={DebugButton}
					title={item.title}
					titleBelow={item.subTitle}
				/>
			);
		}
		return (
			<ActivityPanels {...rest}>
				<MainPanel items={items} onChangePanel={onChangePanel} />
				{secondaryPanel}
			</ActivityPanels>
		);
	}
});

const AppDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'AppDecorator'

		static propTypes = {
			defaultIndex: PropTypes.number,
			defaultItemIndex: PropTypes.number
		}

		static defaultProps = {
			defaultIndex: 0,
			defaultItemIndex: 0
		}

		constructor (props) {
			super(props);
			this.state = {
				debug: false,
				index: this.props.defaultIndex,
				itemIndex: this.props.defaultItemIndex
			};
		}

		handleChangePanel = (ev) => {
			forward('onChangePanel', ev, this.props);
			this.setState({index: ev.index, itemIndex: ev.itemIndex});
		}

		handleToggleDebug = () => {
			this.setState(state => ({debug: !state.debug}));
		}

		render () {
			const {...rest} = this.props;
			delete rest.defaultIndex;
			delete rest.defaultItemIndex;

			return <Wrapped
				{...rest}
				debug={this.state.debug}
				index={this.state.index}
				itemIndex={this.state.itemIndex}
				onChangePanel={this.handleChangePanel}
				onToggleDebug={this.handleToggleDebug}
			/>;
		}
	};
});

export default compose(
	MoonstoneDecorator,
	AppDecorator
)(App);
