import Button from '@enact/moonstone/Button';
import Group from '@enact/ui/Group';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

const Nav = kind({
	name: 'Nav',

	propTypes: {
		countryList: PropTypes.array.isRequired,
		onCountryChange: PropTypes.func.isRequired
	},

	render: ({countryList, onCountryChange, ...rest}) => {
		return (
			<Group
				childComponent={Button}
				selectedProp="selected"
				onSelect={onCountryChange}
				select="radio"
				{...rest}
			>
				{countryList}
			</Group>
		);
	}
});

export default Nav;
