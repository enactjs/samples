import classNames from 'classnames';
import {GroupBase as Group} from '@enact/ui/Group';
import Item from '@enact/moonstone/Item';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import R from 'ramda';
import React from 'react';
import Scroller from '@enact/moonstone/Scroller';
import ViewManager from '@enact/ui/ViewManager';

import css from './App.less';
import Home from './Home';
import fView from './View';

import A11yDecorator from '../views/A11yDecorator';

const
	titles = R.map(R.prop('title')),
	View = fView(React);

const views = [
	{title: 'About A11y', view: Home},
	{title: 'AccessibilityDecorator', view: A11yDecorator},
	{title: 'Button', view: Home},
	{title: 'CheckboxItem', view: Home},
	{title: 'Dialog', view: Home},
	{title: 'Group', view: Home},
	{title: 'Input', view: Home},
	{title: 'Item', view: Home},
	{title: 'Picker', view: Home},
	{title: 'Popup', view: Home},
	{title: 'RadioItem', view: Home},
	{title: 'RangePicker', view: Home},
	{title: 'Scroller', view: Home},
	{title: 'Spinner', view: Home},
	{title: 'SwitchItem', view: Home},
	{title: 'ToggleItem', view: Home},
	{title: 'TooltipDecorator', view: Home},
	{title: 'VideoPlayer', view: Home},
	{title: 'VirtualList', view: Home}
];

class App extends React.Component {
	constructor () {
		super();
		this.state = {
			index: 0
		};
	}

	handleChange = ({selected}) => {
		if (selected !== null) {
			this.setState({
				index: selected
			});
		}
	}

	render = () => {
		const {index} = this.state;

		return (
			<div className={classNames(this.props.className, css.app)}>
				<Scroller className={css.nav}>
					{<Group childComponent={Item} selected={index} onSelect={this.handleChange} itemProps={{className: css.view}}>
						{titles(views)}
					</Group>}
				</Scroller>
				<ViewManager className={css.content} index={index} component="main">
					{views.map((view, i) => (
						<View className={css.view} {...view} key={i} />
					))}
				</ViewManager>
			</div>
		);
	}
}

export default MoonstoneDecorator(App);
