import React, {PropTypes} from 'react';
import kind from '@enact/core/kind';
import {Header} from '@enact/moonstone/Panels';
import Button from '@enact/moonstone/Button';
import css from './Head.less';

const countryList = ['usa', 'spain', 'korea', 'japan'];

const Head = kind({
	name: 'Head',

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
				<Header title="City Viewer" type="compact" />
				{countryButtons}
			</div>
		);
	}
});

export default Head;
