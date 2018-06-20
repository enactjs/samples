import {ApolloProvider} from 'react-apollo';
import ApolloClient from 'apollo-boost';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityPanels} from '@enact/moonstone/Panels';
import MoonstoneDecorator from '@enact/moonstone/MoonstoneDecorator';

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
		this.userId = 'haileyr';
		this.lists = {
			repo: true,
			fol: true,
			org: true
		};

		this.state = {
			userId: '',
			lists: {},
			index: this.props.index
		};
	}

	handleSelectBreadcrumb = ({index}) => {
		this.lists = {
			repo: false,
			fol: false,
			org: false
		};
		this.setState({
			index,
			userId: '',
			lists: this.lists
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
				<ActivityPanels {...this.props} onSelectBreadcrumb={this.handleSelectBreadcrumb} index={index}>
					<Search
						onUserIdChange={this.onUserIdChange}
						onListSelectionChange={this.onListSelectionChange}
						onSearch={this.onSearch}
					/>
					<Detail userId={userId} lists={lists} />
				</ActivityPanels>
			</ApolloProvider>);
	}
}

const App =	MoonstoneDecorator(AppBase);

export default App;
export {App, AppBase};
