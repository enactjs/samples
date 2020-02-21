import {Panels} from '@enact/sandstone/Panels';
import {SlideLeftArranger} from '@enact/ui/ViewManager';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import PropTypes from 'prop-types';
import React from 'react';

import ButtonPanel from '../views/ButtonPanel';
import ItemPanel from '../views/ItemPanel';
import MainPanel from '../views/MainPanel';

import css from './App.module.less';

class App extends React.Component {
	static propTypes = {
		index: PropTypes.number
	}

	static defaultProps = {
		index: -1
	}

	constructor (props) {
		super(props);
		this.state = {
			index: this.props.index
		};
	}
	
	componentDidMount () {
		setTimeout(() => {
			this.setState({
				index: 0
			});
		}, 100);
	}

	handleSelectBreadcrumb = ({index}) => this.setState({index})

	handleClick = () => this.setState(prevState => ({index: prevState.index + 1}))

	render () {
		return (
			<Panels {...this.props} arranger={SlideLeftArranger} onSelectBreadcrumb={this.handleSelectBreadcrumb} index={this.state.index} className={css.app} noCloseButton>
				<MainPanel title="First" onClick={this.handleClick} />
				<ItemPanel title="Second" onClick={this.handleClick} />
				<ButtonPanel title="Third" onClick={this.handleClick} />
				<MainPanel title="Fourth" />
			</Panels>
		);
	}
}

export default ThemeDecorator(App);
