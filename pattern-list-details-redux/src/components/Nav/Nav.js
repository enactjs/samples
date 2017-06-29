import React from 'react';
import PropTypes from 'prop-types';
import kind from '@enact/core/kind';
import CountryButton from './CountryButton';
import css from './Nav.less';

const Nav = kind({
	name: 'Nav',

	propTypes: {
		countries: PropTypes.array.isRequired,
		onCountryChange: PropTypes.func.isRequired
	},

	styles: {
		css,
		className: 'nav'
	},

	computed: {
		countryButtons: ({countries, onCountryChange}) => {
			return countries.map((country, index) => {
				return (
					<CountryButton
						key={index}
						onCountryChange={onCountryChange}
						country={country}
					/>
				);
			});
		}
	},

	render: ({countryButtons, ...rest}) => {
		delete rest.countries;
		delete rest.onCountryChange;

		return (
			<div {...rest}>
				{countryButtons}
			</div>
		);
	}
});

export default Nav;
