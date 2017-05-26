import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels, Routable, Route} from '@enact/moonstone/Panels';
import MainPanel from '../views/MainPanel';
import EditChannelPanel from '../views/EditChannelPanel';
import AppStateDecorator from './AppStateDecorator';

const RoutablePanels = Routable({navigate: 'onSelectBreadcrumb'}, ActivityPanels);

class App extends React.Component {
	static propTypes = {
		getChannelList: React.PropTypes.func.isRequired,
		onNavigate: React.PropTypes.func.isRequired,
		path: React.PropTypes.string.isRequired
	}

	componentDidMount () {
		this.props.getChannelList();
	}

	onSecondPanel = () => {
		this.props.onNavigate({path: '/first/second'});
	}

	render () {
		const {onNavigate, path, ...rest} = this.props;
		delete rest.getChannelList;

		return (
			<RoutablePanels {...rest} onSelectBreadcrumb={onNavigate} path={path}>
				<Route path="first" component={MainPanel} onClick={this.onSecondPanel}>
					<Route path="second" component={EditChannelPanel} />
				</Route>
			</RoutablePanels>
		);
	}
}

export default MoonstoneDecorator(
	AppStateDecorator(
		App
	)
);
