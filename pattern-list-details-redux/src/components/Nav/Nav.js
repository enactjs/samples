import React, {PropTypes} from 'react';
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
			const onClick = (ev) => {
				const nextCountry = ev.target.textContent.toLowerCase();

				onCountryChange(nextCountry);
			};

			return countries.map((country, index) => {
				return (
					<CountryButton
						key={index}
						onClick={onClick}
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
