import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';
import css from './Nav.less';

const countryList = ['usa', 'spain', 'korea', 'japan'];

const Nav = kind({
	name: 'Nav',

	propTypes: {
		onCountryChange: PropTypes.func.isRequired,
		selectedCountry: PropTypes.string.isRequired
	},

	defaultProps: {
		selectedCountry: 'usa'
	},

	computed: {
		countryButtons: ({selectedCountry, onCountryChange}) => {
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
