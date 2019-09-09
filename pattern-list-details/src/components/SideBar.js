import Group from '@enact/ui/Group';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import SelectableItem from '@enact/moonstone/SelectableItem';

const SideBar = kind({
	name: 'SideBar',

	propTypes: {
		onCityChange: PropTypes.func.isRequired,
		selectedCountry: PropTypes.string.isRequired,
		cities: PropTypes.object
	},

	render: ({cities, onCityChange, selectedCountry, ...rest}) => {
		return (
			<Group
				childComponent={SelectableItem}
				selectedProp="selected"
				onSelect={onCityChange}
				select="radio"
				{...rest}
			>
				{cities[selectedCountry]}
			</Group>
		);
	}
});

export default SideBar;
