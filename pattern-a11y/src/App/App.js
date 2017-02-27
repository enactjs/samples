import classNames from 'classnames';
import {GroupBase as Group} from '@enact/ui/Group';
import Item from '@enact/moonstone/Item';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import R from 'ramda';
import React, {Component} from 'react';
import Scroller from '@enact/moonstone/Scroller';
import ViewManager from '@enact/ui/ViewManager';

import css from './App.less';
import Home from './Home';
import View from './View';

import A11yDecorator from '../views/A11yDecorator';
import Picker from '../views/Picker';

const
	titles = R.map(R.prop('title')),
	views = [
		{title: 'About A11y', view: Home},
		{title: 'A11yDecorator', view: A11yDecorator},
		{title: 'Picker', view: Picker}
	];

class App extends Component {
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
