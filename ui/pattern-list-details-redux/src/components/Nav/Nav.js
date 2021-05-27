import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import CountryButton from './CountryButton';

const Nav = kind({
	name: 'Nav',

	propTypes: {
		countries: PropTypes.array.isRequired,
		onCountryChange: PropTypes.func.isRequired
	},

	render: ({countries, onCountryChange}) => (
		<React.Fragment>
			{countries.map((country, index) => (
				<CountryButton
					country={country}
					key={'countryButton' + index}
					onCountryChange={onCountryChange}
				/>
			))}
		</React.Fragment>
	)
});

export default Nav;
