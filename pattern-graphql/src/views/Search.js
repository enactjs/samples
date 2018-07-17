import FormCheckboxItem from '@enact/moonstone/FormCheckboxItem';
import {Header, Panel} from '@enact/moonstone/Panels';
import IconButton from '@enact/moonstone/IconButton';
import Input from '@enact/moonstone/Input';
import Notification from '@enact/moonstone/Notification';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Search extends Component {
	static propTypes = {
		apiToken: PropTypes.string,
		onSearch: PropTypes.func,
		onUserIdChange: PropTypes.func,
		userId: PropTypes.string
	};

	constructor (props) {
		super(props);
		this.userId = React.createRef();
		this.state = {
			fol: false,
			org: false,
			repo: true,
			userId: ''
		};
	}

	onUserIdChange = (ev) => {
		this.setState({userId: ev.value});
	};

	onSearch = () => {
		this.props.onSearch(this.state);
	}

	onRepoToggle = () => {
		this.setState(prevState => ({repo: !prevState.repo}));
	}

	onFolToggle = () => {
		this.setState(prevState => ({fol: !prevState.fol}));
	}

	onOrgToggle = () => {
		this.setState(prevState => ({org: !prevState.org}));
	}

	onKeyUp = (ev) => {
		if (ev.keyCode === 13) {
			this.props.onSearch(this.state);
		}
	}

	render = () => {
		const {apiToken, ...rest} = this.props;
		const {repo, org, fol} = this.state;
		delete rest.onSearch;
		delete rest.onUserIdChange;
		delete rest.onListSelectionChange;
		return (
			<Panel {...rest}>
				{!apiToken && <Notification open><p>Please set your github token in src/config.json.</p></Notification>}
				<Header title="Dev checks" type="compact" />
				<Input placeholder="Github id" ref={this.userId} onChange={this.onUserIdChange} onKeyUp={this.onKeyUp} />
				<IconButton onClick={this.onSearch} backgroundOpacity="transparent">search</IconButton>
				<FormCheckboxItem defaultSelected={repo} onToggle={this.onRepoToggle}>Repositories</FormCheckboxItem>
				<FormCheckboxItem defaultSelected={org} onToggle={this.onOrgToggle}>Organizations</FormCheckboxItem>
				<FormCheckboxItem defaultSelected={fol} onToggle={this.onFolToggle}>Followers</FormCheckboxItem>
			</Panel>
		);
	}
}

export default Search;
