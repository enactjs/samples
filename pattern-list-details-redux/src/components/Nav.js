import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import css from './Nav.less';

const Nav = kind({
	name: 'Nav',

	propTypes: {
		data: PropTypes.object.isRequired,
		onCountryChange: PropTypes.func.isRequired,
		selectedCountry: PropTypes.string.isRequired
	},

	styles: {
		css,
		className: 'nav'
	},

	computed: {
		countryButtons: ({data, selectedCountry, onCountryChange}) => {
			const countries = Object.keys(data);

			const onClick = (ev) => {
				const nextCountry = ev.target.textContent.toLowerCase();
				const nextCity = data[nextCountry][0];

				onCountryChange(nextCountry, nextCity);
			};

			return countries.map((country, index) => {
				return (
					<Button
						backgroundOpacity="translucent"
						key={index}
						onClick={onClick}
						selected={country === selectedCountry}
						small
					>
						{country}
					</Button>
				);
			});
		}
	},

	render: ({countryButtons, ...rest}) => {
		delete rest.data;
		delete rest.onCountryChange;
		delete rest.selectedCountry;

		return (
			<div {...rest}>
				{countryButtons}
			</div>
		);
	}
});

export default Nav;
