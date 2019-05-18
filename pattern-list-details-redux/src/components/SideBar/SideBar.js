import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import CityItem from './CityItem';

const SideBar = kind({
	name: 'SideBar',

	propTypes: {
		cities: PropTypes.array.isRequired,
		onCityChange: PropTypes.func.isRequired
	},

	render: ({cities, onCityChange}) => (
		<React.Fragment>
			{cities.map((city, index) => (
				<CityItem
					city={city}
					key={'cityItem' + index}
					onCityChange={onCityChange}
				/>
			))}
		</React.Fragment>
	)
});

export default SideBar;
