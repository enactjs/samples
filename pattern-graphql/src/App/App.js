import {ActivityPanels} from '@enact/moonstone/Panels';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
import Notification from '@enact/moonstone/Notification';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Detail from '../views/Detail';
import Search from '../views/Search';
import config from '../config.json';


const client = new ApolloClient({
	uri: 'https://api.github.com/graphql',
	request: operation => {
		operation.setContext({
			headers: {
				authorization: `Bearer ${config.token}`
			}
		});
	}
});

class AppBase extends Component {
	static propTypes = {
		index: PropTypes.number,
		onSearch: PropTypes.func
	};

	static defaultProps = {
		index: 0
	};

	constructor (props) {
		super(props);

		this.state = {
			index: this.props.index,
			fol: false,
			org: false,
			repo: true,
			userId: ''
		};
	}

	handleSelectBreadcrumb = ({index}) => {
		this.setState({index});
	};

	onSearch = ({userId, repo, fol, org}) => {
		this.setState({
			index: 1,
			userId,
			repo,
			fol,
			org
		});
	};

	render () {
		const {index, userId, repo, org, fol} = this.state;

		return (
			<ApolloProvider client={client}>
				{!config.token && <Notification open><p>Please set your github token in src/config.json.</p></Notification>}
				<ActivityPanels {...this.props} index={index} onSelectBreadcrumb={this.handleSelectBreadcrumb}>
					<Search
						onSearch={this.onSearch}
					/>
					<Detail repo={repo} org={org} fol={fol} userId={userId} />
				</ActivityPanels>
			</ApolloProvider>
		);
	}
}

const App = MoonstoneDecorator(AppBase);

export default App;
