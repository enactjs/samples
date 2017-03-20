import React, {PropTypes} from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels} from '@enact/moonstone/Panels';

import FirstPanel from '../views/FirstPanel';
import SecondPanel from '../views/SecondPanel';
import ThirdPanel from '../views/ThirdPanel';

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

	handleNext = () => this.setState({index: this.state.index + 1})

	handlePrevious = () => this.setState({index: this.state.index - 1})

	render () {
		return (
			<ActivityPanels {...this.props} onSelectBreadcrumb={this.handleSelectBreadcrumb} index={this.state.index}>
				<FirstPanel title="USING ES5" onClick={this.handleNext} />
				<SecondPanel title="USING ES6" onClick={this.handlePrevious} />
			</ActivityPanels>
		);
	}
}

export default MoonstoneDecorator(App);
