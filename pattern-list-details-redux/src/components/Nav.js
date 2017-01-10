import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';

const Nav = kind({
	name: 'Nav',

	propTypes: {
		countryList: PropTypes.array.isRequired,
		onCountryChange: PropTypes.func.isRequired,
		selectedCountry: PropTypes.string.isRequired,
		cities: PropTypes.object
	},

	defaultProps: {
		selectedCountry: 'usa'
	},

	computed: {
		countryButtons: ({countryList, selectedCountry, onCountryChange}) => {
			return countryList.map((country, index) => {
				return (
					<Button
						backgroundOpacity="translucent"
						key={index}
						onClick={onCountryChange}
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
		delete rest.cities;
		delete rest.countryList;
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
