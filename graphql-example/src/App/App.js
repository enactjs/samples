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
		onListSelectionChange: PropTypes.func,
		onSearch: PropTypes.func,
		onUserIdChange: PropTypes.func
	};

	static defaultProps = {
		index: 0
	};

	constructor (props) {
		super(props);
		this.userId = '';
		this.lists = {
			fol: false,
			org: false,
			repo: false
		};

		this.state = {
			index: this.props.index,
			lists: {},
			userId: ''
		};
	}

	handleSelectBreadcrumb = ({index}) => {
		this.lists = {
			fol: false,
			org: false,
			repo: false
		};
		this.setState({
			index,
			lists: this.lists,
			userId: ''
		});
	};

	onUserIdChange = (userId) => {
		this.userId = userId;
	};

	onListSelectionChange = (target, value) => {
		this.lists[target] = value;
	};

	onSearch = () => {
		this.setState({index: 1, userId: this.userId, lists: this.lists});
	};

	render () {
		const {index, userId, lists} = this.state;

		return (
			<ApolloProvider client={client}>
				<ActivityPanels {...this.props} index={index} onSelectBreadcrumb={this.handleSelectBreadcrumb}>
					<Search
						apiToken={config.token}
						onListSelectionChange={this.onListSelectionChange}
						onSearch={this.onSearch}
						onUserIdChange={this.onUserIdChange}
					/>
					<Detail lists={lists} userId={userId} />
				</ActivityPanels>
			</ApolloProvider>
		);
	}
}

const App = MoonstoneDecorator(AppBase);

export default App;
export {App, AppBase};
