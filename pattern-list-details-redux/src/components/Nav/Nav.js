import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import CountryButton from './CountryButton';
import css from './Nav.less';

const Nav = kind({
	name: 'Nav',

	propTypes: {
		data: PropTypes.object.isRequired,
		onCountryChange: PropTypes.func.isRequired
	},

	styles: {
		css,
		className: 'nav'
	},

	computed: {
		countryButtons: ({data, onCountryChange}) => {
			const countries = Object.keys(data);

			const onClick = (ev) => {
				const nextCountry = ev.target.textContent.toLowerCase();
				const nextCity = data[nextCountry][0];

				onCountryChange(nextCountry, nextCity);
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
		delete rest.data;
		delete rest.onCountryChange;

		return (
			<div {...rest}>
				{countryButtons}
			</div>
		);
	}
});

export default Nav;
