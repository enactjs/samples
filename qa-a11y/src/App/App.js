import Changeable from '@enact/ui/Changeable';
import Group from '@enact/ui/Group';
import Item from '@enact/moonstone/Item';
import kind from '@enact/core/kind';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import React from 'react';
import Scroller from '@enact/moonstone/Scroller';
import ViewManager from '@enact/ui/ViewManager';

import css from './App.less';
import Home from './Home';
import View from './View';

import A11yDecorator from '../views/A11yDecorator';
import Button from '../views/Button';
import ContextualPopupDecorator from '../views/ContextualPopupDecorator';
import DayPicker from '../views/DayPicker';
import Dialog from '../views/Dialog';
import ExpandableItem from '../views/ExpandableItem';
import ExpandableList from '../views/ExpandableList';
import Input from '../views/Input';
import ItemView from '../views/Item';
import Notification from '../views/Notification';
import Picker from '../views/Picker';
import Popup from '../views/Popup';
import ProgressBar from '../views/ProgressBar';
import ReadOrder from '../views/ReadOrder';
import Slider from '../views/Slider';
import Spinner from '../views/Spinner';
import TooltipDecorator from '../views/TooltipDecorator';
import VirtualList from '../views/VirtualList';

const views = [
	{title: 'About A11y', view: Home},
	{title: 'A11yDecorator', view: A11yDecorator},
	{title: 'Button', view: Button},
	{title: 'ContextualPopupDecorator', view: ContextualPopupDecorator},
	{title: 'DayPicker', view: DayPicker},
	{title: 'Dialog', view: Dialog},
	{title: 'ExpandableItem', view: ExpandableItem},
	{title: 'ExpandableList', view: ExpandableList},
	{title: 'Input', view: Input},
	{title: 'Item', view: ItemView},
	{title: 'Notification', view: Notification},
	{title: 'Picker', view: Picker},
	{title: 'Popup', view: Popup},
	{title: 'ProgressBar', view: ProgressBar},
	{title: 'ReadOrder', view: ReadOrder},
	{title: 'Slider', view: Slider},
	{title: 'Spinner', view: Spinner},
	{title: 'TooltipDecorator', view: TooltipDecorator},
	{title: 'VirtualList', view: VirtualList}
];

const AppBase = kind({
	computed: {
		handleChange: ({onIndex}) => ({selected}) => {
			if (selected !== null) {
				onIndex({index: selected});
			}
		}
	},

	render: ({handleChange, index, ...rest}) => {
		delete rest.onIndex;

		return (
			<div {...rest}>
				<Scroller className={css.nav}>
					<Group childComponent={Item} itemProps={{className: css.navItem}} onSelect={handleChange} selected={index}>
						{views.map((view) => view.title)}
					</Group>
				</Scroller>
				<ViewManager className={css.content} index={index}>
					{views.map((view, i) => (
						<View {...view} key={i} />
					))}
				</ViewManager>
			</div>
		);
	}
});

const App = MoonstoneDecorator(Changeable({prop: 'index', change: 'onIndex'}, AppBase));

export default App;
