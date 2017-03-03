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
import DayPicker from '../views/DayPicker';
import ExpandableItem from '../views/ExpandableItem';
import ExpandableList from '../views/ExpandableList';
import Input from '../views/Input';
import ItemView from '../views/Item';
import Picker from '../views/Picker';
import ProgressBar from '../views/ProgressBar';
import Slider from '../views/Slider';
import Switch from '../views/Switch';

const views = [
	{title: 'About A11y', view: Home},
	{title: 'A11yDecorator', view: A11yDecorator},
	{title: 'Button', view: Button},
	{title: 'DayPicker', view: DayPicker},
	{title: 'ExpandableItem', view: ExpandableItem},
	{title: 'ExpandableList', view: ExpandableList},
	{title: 'Input', view: Input},
	{title: 'Item', view: ItemView},
	{title: 'Picker', view: Picker},
	{title: 'ProgressBar', view: ProgressBar},
	{title: 'Slider', view: Slider},
	{title: 'Switch', view: Switch}
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
