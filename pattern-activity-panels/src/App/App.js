import React from 'react';
import PropTypes from 'prop-types';
import Changeable from '@enact/ui/Changeable';
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
		const {onSelectSkin, ...rest} = {...this.props};
		return (
			<ActivityPanels {...rest} onSelectBreadcrumb={this.handleSelectBreadcrumb} index={this.state.index}>
				<MainPanel title="First" onSelectSkin={onSelectSkin} onClick={this.handleClick} />
				<ItemPanel title="Second" onClick={this.handleClick} />
				<ButtonPanel title="Third" onClick={this.handleClick} />
				<MainPanel title="Fourth" onSelectSkin={onSelectSkin} />
			</ActivityPanels>
		);
	}
}

export default Changeable({change: 'onSelectSkin', prop: 'skin'}, MoonstoneDecorator(App));
