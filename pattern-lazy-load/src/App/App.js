import React, {PropTypes} from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels} from '@enact/moonstone/Panels';

import NextPanel from '../views/NextPanel';
import MainPanel from '../views/MainPanel';
import OnePanel from '../views/OnePanel';
import PickerPanel from '../views/PickerPanel';
import AnotherPanel from '../views/AnotherPanel';

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
				<NextPanel title="Third" onClick={this.handleClick} />
				<OnePanel title="Third" onClick={this.handleClick} />
				<PickerPanel title="Third" onClick={this.handleClick} />
				<AnotherPanel title="Third" onClick={this.handleClick} />
			</ActivityPanels>
		);
	}
}

export default MoonstoneDecorator(App);