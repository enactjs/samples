import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import css from './Nav.less';

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
						className={css.button}
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
			<div className={css.head}>
				{countryButtons}
			</div>
		);
	}
});

export default Nav;
