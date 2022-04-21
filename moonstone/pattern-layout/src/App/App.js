import {adaptEvent, forward, handle} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels} from '@enact/moonstone/Panels';
import PropTypes from 'prop-types';
import {useCallback, useState} from 'react';

import {importAll} from '../components/util';
import Details from '../views/Details';
import FavoritesList from '../views/FavoritesList';
import MainPanel from '../views/MainPanel';

const thumbs = importAll(require.context('../views/thumbs', false, /\.(png|jpe?g|svg)$/));

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
itemPusher('Favorites List', 'Two list columns with focusable buttons in the center', FavoritesList, thumbs['favorites-list.jpg']);
itemPusher('Details View', 'Show off details about an item', Details, thumbs['details.jpg']);

const Placeholder = kind({name: 'Placeholder'});

const Sample = kind({
	name: 'LayoutApp',

	propTypes: {
		debug: PropTypes.bool,
		itemIndex: PropTypes.number,
		onChangePanel: PropTypes.func,
		onToggleDebug: PropTypes.func
	},

	computed: {
		DebugButton: ({onToggleDebug, debug}) => (<Button onClick={onToggleDebug} selected={debug} size="small">Layout Borders</Button>)
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
	const Component = ({defaultDebug, defaultIndex, defaultItemIndex, ...rest}) => {
		const [debug, setDebug] = useState(defaultDebug);
		const [index, setIndex] = useState(defaultIndex);
		const [itemIndex, setItemIndex] = useState(defaultItemIndex);

		const handleChangePanel = useCallback((ev) => {
			forward('onChangePanel', ev, rest);
			setIndex(ev.index);
			setItemIndex(ev.itemIndex);
		}, [rest]);

		const handleToggleDebug = useCallback(() => {
			setDebug((prevDebug) => {
				const nextDebug = {debug: !prevDebug};
				forward('onToggleDebug', nextDebug, rest);

				return !prevDebug;
			});
		}, [rest]);

		return (
			<Wrapped
				{...rest}
				debug={debug}
				index={index}
				itemIndex={itemIndex}
				onChangePanel={handleChangePanel}
				onToggleDebug={handleToggleDebug}
			/>
		);
	};

	Component.displayName = 'AppDecorator';

	Component.propTypes = {
		defaultDebug: PropTypes.bool,
		defaultIndex: PropTypes.number,
		defaultItemIndex: PropTypes.number
	};

	Component.defaultProps = {
		defaultDebug: false,
		defaultIndex: 0,
		defaultItemIndex: 0
	};

	return Component;
});

const AppBase = AppDecorator(Sample);
const App = MoonstoneDecorator(AppBase);

export default App;
export {App, AppBase};
