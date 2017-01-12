import React from 'react';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import {ActivityPanels, Routable, Route} from '@enact/moonstone/Panels';
import {connect} from 'react-redux';
import MainPanel from '../views/MainPanel';
import EditChannelPanel from '../views/EditChannelPanel';
import AppStateDecorator from './AppStateDecorator';
import {getChannelList} from '../actions/';

const RoutablePanels = Routable({navigate: 'onSelectBreadcrumb'}, ActivityPanels);

class App extends React.Component {
	static propTypes = {
		dispatch: React.PropTypes.func.isRequired,
		onNavigate: React.PropTypes.func.isRequired,
		path: React.PropTypes.string.isRequired
	}

	componentDidMount () {
		this.props.dispatch(getChannelList({
			'channelGroup': 'All',
			'channelMode' : ['Tuner'],
			'dataType':0,
			'sort':0
		}));
	}

	onSecondPanel = () => {
		this.props.onNavigate({path: '/first/second'});
	}

	render () {
		const {onNavigate, path, ...rest} = this.props;
		delete rest.dispatch;

		return (
			<RoutablePanels {...rest} onSelectBreadcrumb={onNavigate} path={path}>
				<Route path="first" component={MainPanel} title="First" onClick={this.onSecondPanel}>
					<Route path="second" component={EditChannelPanel} title="Second" />
				</Route>
			</RoutablePanels>
		);
	}
}

export default MoonstoneDecorator(
	AppStateDecorator(
		connect()(App)
	)
);
