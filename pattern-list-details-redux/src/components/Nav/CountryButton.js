import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import Button from '@enact/moonstone/Button';

const CountryButton = kind({
	name: 'countryButton',

	propTypes: {
		country: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired,
		selected: PropTypes.bool
	},

	render: ({country, onClick, selected, ...rest}) => {
		delete rest.dispatch;

		return (
			<Button
				{...rest}
				backgroundOpacity="translucent"
				onClick={onClick}
				selected={selected}
				small
			>
				{country}
			</Button>
		);
	}
});

const mapStateToProps = (state, ownProps) => {
	const country = ownProps.country;
	return {
		selected: state.data[country].selected
	};
};

const CountryButtonContainer = connect(mapStateToProps)(CountryButton);

export default CountryButtonContainer;
