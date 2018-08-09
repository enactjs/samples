import FormCheckboxItem from '@enact/moonstone/FormCheckboxItem';
import {Header, Panel} from '@enact/moonstone/Panels';
import IconButton from '@enact/moonstone/IconButton';
import Input from '@enact/moonstone/Input';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Search extends Component {
	static propTypes = {
		apiToken: PropTypes.string,
		handleIdChange: PropTypes.func,
		onSearch: PropTypes.func,
		userId: PropTypes.string
	};

	constructor (props) {
		super(props);
		this.state = {
			fol: false,
			org: false,
			repo: true,
			userId: ''
		};
	}

	handleIdChange = (ev) => {
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

	render () {
		const {...rest} = this.props;
		const {repo, org, fol} = this.state;
		delete rest.onSearch;
		delete rest.handleIdChange;

		return (
			<Panel {...rest}>
				<Header
					title="Developer Information"
					titleBelow="Check a developer's repositories, organizations and/or followers."
				/>
				<Input placeholder="Github id" onChange={this.handleIdChange} onKeyUp={this.onKeyUp} />
				<IconButton onClick={this.onSearch} backgroundOpacity="transparent">search</IconButton>
				<FormCheckboxItem defaultSelected={repo} onToggle={this.onRepoToggle}>Repositories</FormCheckboxItem>
				<FormCheckboxItem defaultSelected={org} onToggle={this.onOrgToggle}>Organizations</FormCheckboxItem>
				<FormCheckboxItem defaultSelected={fol} onToggle={this.onFolToggle}>Followers</FormCheckboxItem>
			</Panel>
		);
	}
}

export default Search;
