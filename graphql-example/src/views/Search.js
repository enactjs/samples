import FormCheckboxItem from '@enact/moonstone/FormCheckboxItem';
import {Header, Panel} from '@enact/moonstone/Panels';
import IconButton from '@enact/moonstone/IconButton';
import Input from '@enact/moonstone/Input';
import kind from '@enact/core/kind';
import Notification from '@enact/moonstone/Notification';
import PropTypes from 'prop-types';
import React from 'react';

const Search = kind({
	name: 'Detail',

	propTypes: {
		apiToken: PropTypes.string,
		onListSelectionChange: PropTypes.func,
		onSearch: PropTypes.func,
		onUserIdChange: PropTypes.func,
		userId: PropTypes.string
	},

	handlers: {
		onSearch: (ev, props) => {
			props.onSearch();
		},
		onInputChange: (ev, props) => {
			props.onUserIdChange(ev.value);
		},
		onRepoSelection: (ev, props) => {
			props.onListSelectionChange('repo', ev.selected);
		},
		onFolSelection: (ev, props) => {
			props.onListSelectionChange('fol', ev.selected);
		},
		onOrgSelection: (ev, props) => {
			props.onListSelectionChange('org', ev.selected);
		}
	},

	render: ({apiToken, onFolSelection, onInputChange, onRepoSelection, onOrgSelection, onSearch, ...rest}) => {
		delete rest.onUserIdChange;
		delete rest.onListSelectionChange;
		return (
			<Panel {...rest}>
				{!apiToken && <Notification open><p>Please set your github token in src/config.json.</p></Notification>}
				<Header title="Dev checks" type="compact" />
				<Input placeholder="Github id" onChange={onInputChange} dismissOnEnter />
				<IconButton onClick={onSearch} backgroundOpacity="transparent">search</IconButton>
				<FormCheckboxItem onToggle={onRepoSelection}>Repositories</FormCheckboxItem>
				<FormCheckboxItem onToggle={onFolSelection}>Followers</FormCheckboxItem>
				<FormCheckboxItem onToggle={onOrgSelection}>Organizations</FormCheckboxItem>
			</Panel>
		);
	}
});

export default Search;
