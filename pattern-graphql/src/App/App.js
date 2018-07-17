import {ActivityPanels} from '@enact/moonstone/Panels';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';
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

	onSearch = (formItems) => {
		this.setState({
			index: 1,
			userId: formItems.userId,
			repo: formItems.repo,
			fol: formItems.fol,
			org: formItems.org
		});
	};

	render () {
		const {index, userId, repo, org, fol} = this.state;

		return (
			<ApolloProvider client={client}>
				<ActivityPanels {...this.props} index={index} onSelectBreadcrumb={this.handleSelectBreadcrumb}>
					<Search
						apiToken={config.token}
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
