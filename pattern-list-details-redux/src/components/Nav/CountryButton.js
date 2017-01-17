import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';

const CountryButton = kind({
	name: 'countryButton',

	propTypes: {
		country: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
		selectedCountry: PropTypes.string.isRequired
	},

	render: ({country, onClick, selectedCountry, ...rest}) => {
		delete rest.dispatch;

		return (
			<Button
				{...rest}
				backgroundOpacity="translucent"
				onClick={onClick}
				selected={country === selectedCountry}
				small
			>
				{country}
			</Button>
		);
	}
});

const mapStateToProps = (state) => ({
	selectedCountry: state.country
});

const CountryButtonContainer = connect(mapStateToProps)(CountryButton);

export default CountryButtonContainer;
