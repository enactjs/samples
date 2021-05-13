import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels} from '@enact/moonstone/Panels';
import {Component} from 'react';

import ButtonPanel from '../views/ButtonPanel';
import ItemPanel from '../views/ItemPanel';
import MainPanel from '../views/MainPanel';

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			index: 0
		};
	}

	handleSelectBreadcrumb = ({index}) => this.setState({index});

	handleClick = () => this.setState(prevState => ({index: prevState.index + 1}));

	render () {
		return (
			<ActivityPanels {...this.props} index={this.state.index} onSelectBreadcrumb={this.handleSelectBreadcrumb}>
				<MainPanel onClick={this.handleClick} title="First" />
				<ItemPanel onClick={this.handleClick} title="Second" />
				<ButtonPanel onClick={this.handleClick} title="Third" />
				<MainPanel title="Fourth" />
			</ActivityPanels>
		);
	}
}

export default MoonstoneDecorator(App);
