import React from 'react';
import PropTypes from 'prop-types';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels} from '@enact/moonstone/Panels';

import ButtonPanel from '../views/ButtonPanel';
import ItemPanel from '../views/ItemPanel';
import MainPanel from '../views/MainPanel';

class App extends React.Component {
	static propTypes = {
		index: PropTypes.number
	}

	static defaultProps = {
		index: 0
	}

	constructor (props) {
		super(props);
		this.state = {
			index: this.props.index
		};
	}

	handleSelectBreadcrumb = ({index}) => this.setState({index})

	handleClick = () => this.setState({index: this.state.index + 1})

	render () {
		return (
			<ActivityPanels {...this.props} onSelectBreadcrumb={this.handleSelectBreadcrumb} index={this.state.index}>
				<MainPanel title="First" onClick={this.handleClick} />
				<ItemPanel title="Second" onClick={this.handleClick} />
				<ButtonPanel title="Third" onClick={this.handleClick} />
				<MainPanel title="Fourth" />
			</ActivityPanels>
		);
	}
}

export default MoonstoneDecorator(App);
